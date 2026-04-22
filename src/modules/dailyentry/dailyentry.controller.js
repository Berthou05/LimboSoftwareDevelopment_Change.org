/*
Title: dailyentry.controller.js
Last modification: April 13,2026
Modified by: Alexis Berthou
*/

const crypto = require('crypto');
const { z } = require('zod');

const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');
const DailyEntry = require('../../models/dailyentry');
const Collaboration = require('../../models/collaboration');
const EmployeeTeamMembership = require('../../models/employeeTeamMembership');
const Project = require('../../models/project');

const MAX_TEXT_LENGTH = 500;
const MAX_URL_LENGTH = 2048;
const SLACK_MAX_SIGNATURE_AGE_SECONDS = 300;
const AUTO_JOIN_ROLE = 'EMPLOYEE';
const AUTO_JOIN_PROJECT_DESCRIPTION = 'Auto-joined from Slack standup.';

// Keep the webhook contract local to this controller because this payload is only consumed here.
const SlackDailyEntryPayloadSchema = z.object({
    // Slack identifies the sender through the display name currently mapped to account.slack_username.
    user: z.object({
        displayName: z.string().trim().min(1),
    }),
    // Accept only calendar-valid YYYY-MM-DD dates so invalid payloads fail as 400 before hitting persistence.
    date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((value) => {
            const dateParts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

            if (!dateParts) {
                return false;
            }

            const parsedYear = Number(dateParts[1]);
            const parsedMonth = Number(dateParts[2]);
            const parsedDay = Number(dateParts[3]);
            const parsedDate = new Date(Date.UTC(parsedYear, parsedMonth - 1, parsedDay));

            // Prevent impossible dates such as 2026-04-31 from reaching the DB layer as 500s.
            return parsedDate.getUTCFullYear() === parsedYear
                && parsedDate.getUTCMonth() === parsedMonth - 1
                && parsedDate.getUTCDate() === parsedDay;
        }),
    // didToday and doingTomorrow are the required standup sections used by the rest of the workflow.
    standup: z.object({
        didToday: z.string().trim().min(1).transform((value) => value.slice(0, MAX_TEXT_LENGTH)),
        doingTomorrow: z.string().trim().min(1).transform((value) => value.slice(0, MAX_TEXT_LENGTH)),
        // Blockers can be omitted by the sender, but we still normalize the stored value.
        blockers: z.string().optional().default('')
            .transform((value) => value.trim().slice(0, MAX_TEXT_LENGTH)),
    }),
    // Normalize optional URL and text fields during validation so downstream logic can stay simple.
    standup_url: z.string().optional().default('')
        .transform((value) => value.trim().slice(0, MAX_URL_LENGTH)),
    team: z.object({
        name: z.string().trim().min(1),
    }).optional(),
    // Slack test payloads have used channel as either a string or an object with a name field.
    channel: z.union([
        z.object({
            name: z.string().trim().min(1),
        }),
        z.string().trim().min(1),
    ]).optional(),
});

/*getAiWrapper()
Function responsible for loading the AI wrapper ESM module from a
CommonJS controller.*/

const getAiWrapper = async function getAiWrapper() {
    return import('../../utils/webServices/aiWrapper.mjs');
};

/*validateSlackSignature(request)
Function responsible for validating Slack signature and replay window
using request raw payload and signing secret.*/

const validateSlackSignature = function validateSlackSignature(request) {
    const signingSecret = String(process.env.SLACK_SIGNING_SECRET || '').trim();
    const slackSignature = String(request.get('X-Slack-Signature') || '').trim();
    const slackTimestamp = String(request.get('X-Slack-Request-Timestamp') || '').trim();
    const timestampNumber = Number(slackTimestamp);

    if (!signingSecret || !slackSignature || !slackTimestamp || Number.isNaN(timestampNumber)) {
        return false;
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (Math.abs(nowSeconds - timestampNumber) > SLACK_MAX_SIGNATURE_AGE_SECONDS) {
        return false;
    }

    const rawBody = request.rawBody || JSON.stringify(request.body || {});
    const baseString = `v0:${slackTimestamp}:${rawBody}`;
    const expectedSignature = `v0=${crypto
        .createHmac('sha256', signingSecret)
        .update(baseString)
        .digest('hex')}`;
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(slackSignature, 'utf8');

    if (expectedBuffer.length !== receivedBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

/*submitFromSlack(request, response)
Function responsible for Slack webhook ingestion and async post-processing
for memberships and activities.*/

exports.submitFromSlack = async (request, response) => {
    try {
        // if (!validateSlackSignature(request)) {
        //     return response.status(401).json({
        //         message: 'Invalid Slack signature',
        //     });
        // }

        // Keep webhook payload validation close to the controller so malformed requests fail fast with 400s.
        const parsedPayload = SlackDailyEntryPayloadSchema.safeParse(request.body || {});

        if (!parsedPayload.success) {
            return response.status(400).json({
                message: 'Invalid Slack payload',
            });
        }

        // From this point forward, rely on the normalized schema output instead of re-reading raw request fields.
        const body = parsedPayload.data;
        const slackUsername = body.user.displayName;
        const entryDate = body.date;
        const toDo = body.standup.doingTomorrow;
        const done = body.standup.didToday;
        const blockers = body.standup.blockers;
        const slackStandupURL = body.standup_url;
        const slackTeamName = body.team?.name || body.channel?.name || body.channel || '';

        // Find employee account, team and check for existing entry for the day
        const [accountRows] = await Account.findBySlackUsername(slackUsername);
        const account = accountRows[0];

        if (!account || account.status !== Account.AccountStatus.ACTIVE) {
            return response.status(404).json({
                message: 'Employee account not found',
            });
        }

        const [entryRows] = await DailyEntry.findByEmployeeAndDate(
            account.employee_id,
            entryDate,
        );

        if (entryRows.length > 0) {
            return response.status(409).json({
                message: 'Daily entry already exists for today',
            });
        }

        // Try to find matching team by Slack team or channel name, if not found return 404
        const [teamRows] = slackTeamName ? await Team.findActiveByName(slackTeamName) : [[]];
        const team = teamRows[0];

        if (!team) {
            return response.status(404).json({
                message: 'Slack team not found',
            });
        }

        // Check if employee is part of the team, if not add him
        const [membershipRows] = await EmployeeTeamMembership.fetchByEmployeeAndTeam(
            account.employee_id,
            team.team_id,
        );

        if (membershipRows.length === 0) {
            await EmployeeTeamMembership.join(
                account.employee_id,
                team.team_id,
            );
        }

        // Store daily entry in db
        const entryId = await DailyEntry.create(
            account.employee_id,
            team.team_id,
            entryDate,
            toDo,
            done,
            blockers,
            slackStandupURL,
        );

        response.status(202).json({
            message: 'Daily entry accepted',
        });

        // Asynchronously extract activities, handle project memberships and create activity records
        (async () => {
            const aiWrapper = await getAiWrapper();
            const [
                [employeeProjects],
                [teamProjects],
            ] = await Promise.all([
                Project.getProjectByEmployeeId(account.employee_id),
                Project.getProjectsByTeamId(team.team_id),
            ]);
            const projectCandidates = [];
            const seenProjectIds = new Set();

            // Keep the candidate list narrow so AI can resolve shorthand project references without unrelated noise.
            [...employeeProjects, ...teamProjects].forEach((project) => {
                const projectId = String(project.project_id || '').trim();

                if (!projectId || seenProjectIds.has(projectId)) {
                    return;
                }

                seenProjectIds.add(projectId);
                projectCandidates.push({
                    id: projectId,
                    name: String(project.name || '').trim(),
                });
            });
            const activities = await aiWrapper.extractActivities({
                done,
                projects: projectCandidates,
            });

            for (const activity of activities) {
                const title = String(activity.title || '').trim();
                const description = String(activity.description || '').trim();

                if (!title || !description) {
                    continue;
                }

                const [projectRows] = await Activity.findProjectMatch(activity.project_hint);
                const detectedProjectId = projectRows[0]?.project_id || null;
                const projectId = (detectedProjectId && activity.worked_on_project)
                    ? detectedProjectId
                    : null;

                if (projectId) {
                    const [collaborationRows] = await Collaboration.findActiveByProjectAndEmployee(
                        projectId,
                        account.employee_id,
                    );

                    if (collaborationRows.length === 0) {
                        await Collaboration.joinProject(
                            projectId,
                            account.employee_id,
                            AUTO_JOIN_PROJECT_DESCRIPTION,
                            AUTO_JOIN_ROLE,
                        );
                    }
                }

                await Activity.create(
                    entryId,
                    account.employee_id,
                    team.team_id,
                    projectId,
                    title,
                    description,
                    entryDate,
                );
            }
        })().catch((error) => {
            console.log(error);
        });

        return;
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Unable to process Slack daily entry right now',
        });
    }
};
