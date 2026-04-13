/*
Title: dailyentry.controller.js
Last modification: April 13,2026
Modified by: Alexis Berthou
*/

const crypto = require('crypto');

const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');
const DailyEntry = require('../../models/dailyentry');
const Collaboration = require('../../models/collaboration');
const EmployeeTeamMembership = require('../../models/employeeTeamMembership');
const aiWrapper = require('../../utils/webServices/aiWrapper');

const MAX_TEXT_LENGTH = 500;
const MAX_URL_LENGTH = 2048;
const SLACK_MAX_SIGNATURE_AGE_SECONDS = 300;
const AUTO_JOIN_ROLE = 'EMPLOYEE';
const AUTO_JOIN_PROJECT_DESCRIPTION = 'Auto-joined from Slack standup.';

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
        if (!validateSlackSignature(request)) {
            return response.status(401).json({
                message: 'Invalid Slack signature',
            });
        }

        const body = request.body || {};
        const slackUsername = String(body.slack_username || '').trim();
        const entryDate = String(body.entry_date || '').trim();
        const toDo = String(body.to_do || '').trim().slice(0, MAX_TEXT_LENGTH);
        const done = String(body.done || '').trim().slice(0, MAX_TEXT_LENGTH);
        const blockers = String(body.blockers || '').trim().slice(0, MAX_TEXT_LENGTH);
        const slackStandupURL = String(body.slack_standup_URL || '').trim().slice(0, MAX_URL_LENGTH);
        const slackTeams = Array.isArray(body.slack_teams)
            ? body.slack_teams.map((value) => String(value || '').trim()).filter(Boolean)
            : String(body.slack_teams || '')
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean);
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(entryDate)
            && !Number.isNaN(new Date(`${entryDate}T00:00:00`).getTime());

        if (!slackUsername || !isValidDate || !slackStandupURL) {
            return response.status(400).json({
                message: 'Invalid Slack payload',
            });
        }

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

        const entryId = await DailyEntry.create(
            account.employee_id,
            entryDate,
            toDo,
            done,
            blockers,
            slackStandupURL,
        );

        response.status(202).json({
            message: 'Daily entry accepted',
        });

        (async () => {
            for (const teamName of slackTeams) {
                const [teamRows] = await Team.findActiveByName(teamName);
                const team = teamRows[0];

                if (!team) {
                    console.log(`[AL-01] Unknown Slack team: ${teamName}`);
                    continue;
                }

                const [membershipRows] = await EmployeeTeamMembership.fetchActiveByEmployeeAndTeam(
                    account.employee_id,
                    team.team_id,
                );

                if (membershipRows.length > 0) {
                    continue;
                }

                await EmployeeTeamMembership.join(
                    account.employee_id,
                    team.team_id,
                    new Date(),
                    AUTO_JOIN_ROLE,
                );
            }

            const activities = await aiWrapper.extractActivities({
                entryId,
                toDo,
                done,
                blockers,
                slackStandupURL,
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
