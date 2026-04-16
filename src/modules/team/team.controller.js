/*
Title: team.controller.js
Last modification: April 3,2026
Modified by: Alexis Berthou
*/

const Team = require('../../models/team');
const Employee = require('../../models/employee');
const EmployeeTeamMembership = require('../../models/employeeTeamMembership');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');
const Report = require('../../models/report');
const Search = require('../../models/search');
const renderNotFound = require('../../utils/renderNotFound');
const { randomUUID } = require('crypto');
const path = require('path');

const TEAM_CREATE_PAGE_TITLE = 'New Team';
const TEAM_CREATE_PAGE_SUBTITLE = 'Register a new team and assign yourself as the responsible lead.';
const TEAM_CREATE_DUPLICATE_MESSAGE = 'A team with that name already exists.';
const TEAM_CREATE_GENERIC_ERROR_MESSAGE = 'The team could not be created right now.';
const TEAM_ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const PUBLIC_DIRECTORY = path.join(__dirname, '..', '..', 'public');
const TEAM_MEMBER_ROLES = [
    EmployeeTeamMembership.EmployeeRole.LEAD,
    EmployeeTeamMembership.EmployeeRole.EMPLOYEE,
];

exports.ensureTeamExists = (request, response, next) => {
    return Team.findById(request.params.team_id)
        .then(([teamRows]) => {
            if (!teamRows.length) {
                return renderNotFound(request, response);
            }

            return next();
        })
        .catch(next);
};

//--------------------------- Auxiliar Functions ---------------------------

/*getLatestReport(content_id)
Auxiliar function respondible for returning the optimal information required to show the 
latestReport created of the content_id*/

const getLatestReport = async function getLatestReport(content_id, user_id){
    return Report.fetchLatestReport(user_id, content_id).then(([report,fieldData])=>{
        return Search.getNameFromId(content_id).then(([name,fieldData])=>{
            console.log(report);
            console.log(report[0].report_id);
            return {
                id:report[0].report_id,
                subjectLabel:name[0].name,
                createdAt:report[0].created_at,
                periodStart:report[0].period_start,
                periodEnd:report[0].period_end,
                type:report[0].content_type
            };
        })
        .catch((error)=>{
            return;
        })
    })
    .catch((error)=>{
        console.log(error);
        return;
    })
}


/*buildAvatarUrl(label)
Auxiliar function responsible for creating a fallback avatar based on a label.*/

const buildAvatarUrl = function buildAvatarUrl(label) {
    const normalizedLabel = String(label || 'Unknown').trim() || 'Unknown';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(normalizedLabel)}&background=fbfbfe&color=1f2937`;
};

/*getUploadedTeamImage(request)
Auxiliar function responsible for normalizing uploaded team image paths to the public URL format.*/

const getUploadedTeamImage = function getUploadedTeamImage(request) {
    if (!request.file) {
        return '';
    }

    return `/${path.relative(PUBLIC_DIRECTORY, request.file.path).replace(/\\/g, '/')}`;
};

/*normalizeTeam(team)
Function responsible for the normalization of a team given as a parameter*/

const normalizeTeam = function normalizeTeam(team, currentEmployeeId = '') {
    return {
        id: team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        leadId: team.employee_responsible_id ?? null,
        leadName:
            team.full_name ??
            team.lead_name ??
            'Pending assignment',
        description: team.description ?? 'No team description has been added yet.',
        image: team.image || buildAvatarUrl(team.name),
        isMember: Boolean(team.isMember ?? team.is_member),
        canArchive: Boolean(team.employee_responsible_id && team.employee_responsible_id === currentEmployeeId),
    };
};

const resolveTeamMemberRole = function resolveTeamMemberRole(rawRole) {
    const normalizedRole = String(rawRole || '').trim().toUpperCase();

    if (!TEAM_MEMBER_ROLES.includes(normalizedRole)) {
        return null;
    }

    return normalizedRole;
};

/*formatDayLabel(value)
Auxiliar function responsible for returning a format in MM/DD/YYYY format divided into
month, day, year*/

const formatDayLabel = function formatDayLabel(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Unknown date';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/*buildActivitySections(activities)
Auxiliar function responsible for creating the format of activities
required for the activity visualization modal.*/

const buildActivitySections = function buildActivitySections(activities) {
    const grouped = new Map();

    activities.forEach((activity) => {
        const rawDate = activity.completed_at || activity.completedAt;
        const key = rawDate ? new Date(rawDate).toISOString().slice(0, 10) : 'unknown';
        const items = grouped.get(key) || [];
        const authorName = activity.full_name || activity.authorName || 'Unknown';

        items.push({
            title: activity.title || 'Untitled activity',
            description: activity.description || '',
            authorName,
            authorInitials: authorName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
            activityTimeLabel: rawDate
                ? new Date(rawDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                })
                : '',
        });

        grouped.set(key, items);
    });

    return [...grouped.entries()]
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .map(([key, items]) => ({
            dayLabel: key === 'unknown' ? 'Unknown date' : formatDayLabel(key),
            items,
        }));
};

/*formatProjectItemDateLabel(value)
Auxiliar function responsible for formatting project item dates used in the
team projects summary cards.*/

const formatProjectItemDateLabel = function formatProjectItemDateLabel(value) {
    if (!value) {
        return 'No date';
    }

    return new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/*buildTeamProjectViewModel(project)
Auxiliar function responsible for generating presentation-ready fields for
team project cards, keeping UI calculations outside the template.*/

const buildTeamProjectViewModel = function buildTeamProjectViewModel(project) {
    const goals = project.goals || [];
    const achievements = project.achievements || [];
    const highlights = project.highlights || [];
    const openGoals = goals.filter((goal) => String(goal.status || '').toUpperCase() !== 'COMPLETED');
    const sortedOpenGoals = [...openGoals].sort((leftGoal, rightGoal) => {
        const leftDate = new Date(leftGoal.dueDate || '2999-12-31');
        const rightDate = new Date(rightGoal.dueDate || '2999-12-31');
        return leftDate - rightDate;
    });
    const nextGoal = sortedOpenGoals[0] || null;
    const nextDueDate = nextGoal?.dueDate ? new Date(nextGoal.dueDate) : null;
    const today = new Date();
    const daysUntilDue = nextDueDate
        ? Math.ceil((nextDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    const projectStatus = String(project.status || '').toUpperCase();
    let priorityLabel = 'Low';
    let priorityTone = 'border-slate-200 bg-slate-50 text-slate-700';

    if (projectStatus === 'ACTIVE' && daysUntilDue !== null && daysUntilDue <= 14) {
        priorityLabel = 'High';
        priorityTone = 'border-rose-200 bg-rose-50 text-rose-700';
    } else if (projectStatus === 'ACTIVE' && (daysUntilDue === null || daysUntilDue <= 30)) {
        priorityLabel = 'Medium';
        priorityTone = 'border-amber-200 bg-amber-50 text-amber-700';
    }

    const statusTone = projectStatus === 'ACTIVE'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : projectStatus === 'COMPLETED'
            ? 'border-sky-200 bg-sky-50 text-sky-700'
            : 'border-slate-200 bg-slate-50 text-slate-700';

    const keyInformationItems = [
        ...goals.map((goal) => ({
            type: 'Goal',
            title: goal.title,
            body: goal.description,
            dateValue: goal.dueDate || null,
            dateLabel: formatProjectItemDateLabel(goal.dueDate),
            tone: 'border-amber-200 bg-amber-50 text-amber-700',
        })),
        ...achievements.map((achievement) => ({
            type: 'Achievement',
            title: achievement.title,
            body: achievement.description,
            dateValue: achievement.achievementDate || null,
            dateLabel: formatProjectItemDateLabel(achievement.achievementDate),
            tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        })),
        ...highlights.map((highlight) => ({
            type: 'Highlight',
            title: highlight.title,
            body: highlight.content,
            dateValue: highlight.createdAt || null,
            dateLabel: formatProjectItemDateLabel(highlight.createdAt),
            tone: 'border-sky-200 bg-sky-50 text-sky-700',
        })),
    ];

    const latestKeyInformationItems = keyInformationItems
        .sort((leftItem, rightItem) => {
            return new Date(rightItem.dateValue || 0) - new Date(leftItem.dateValue || 0);
        })
        .slice(0, 3);

    return {
        ...project,
        projectStatus,
        priorityLabel,
        priorityTone,
        statusTone,
        goalsCount: goals.length,
        achievementsCount: achievements.length,
        highlightsCount: highlights.length,
        latestKeyInformationItems,
    };
};

const isValidDateInput = function isValidDateInput(value) {
    if (!value) {
        return true;
    }

    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
};

const resolveActivityFilter = function resolveActivityFilter(query = {}) {
    const preset = typeof query.activityPreset === 'string' ? query.activityPreset.trim() : '';
    const startDate = typeof query.startDate === 'string' ? query.startDate.trim() : '';
    const endDate = typeof query.endDate === 'string' ? query.endDate.trim() : '';
    const today = new Date();

    if (!preset && !startDate && !endDate) {
        const rangeStart = new Date(today);
        const rangeEnd = new Date(today);

        rangeStart.setHours(0, 0, 0, 0);
        rangeEnd.setHours(23, 59, 59, 999);
        rangeStart.setDate(rangeStart.getDate() - 6);

        return {
            preset: 'week',
            startDate: '',
            endDate: '',
            hasManualRange: false,
            isFiltered: true,
            rangeStart,
            rangeEnd,
            error: '',
        };
    }

    if (preset === 'all') {
        return {
            preset,
            startDate: '',
            endDate: '',
            hasManualRange: false,
            isFiltered: false,
            rangeStart: null,
            rangeEnd: null,
            error: '',
        };
    }

    if (preset === 'today' || preset === 'week' || preset === 'month' || preset === 'quarter') {
        const days = preset === 'today'
            ? 1
            : preset === 'week'
                ? 7
                : preset === 'month'
                    ? 30
                    : 90;
        const rangeStart = new Date(today);
        const rangeEnd = new Date(today);

        rangeStart.setHours(0, 0, 0, 0);
        rangeEnd.setHours(23, 59, 59, 999);
        rangeStart.setDate(rangeStart.getDate() - (days - 1));

        return {
            preset,
            startDate: '',
            endDate: '',
            hasManualRange: false,
            isFiltered: true,
            rangeStart,
            rangeEnd,
            error: '',
        };
    }

    if (!isValidDateInput(startDate) || !isValidDateInput(endDate)) {
        return {
            preset: '',
            startDate,
            endDate,
            hasManualRange: Boolean(startDate || endDate),
            isFiltered: false,
            rangeStart: null,
            rangeEnd: null,
            error: 'Correct the activity dates and try again.',
        };
    }

    if (startDate && endDate && startDate > endDate) {
        return {
            preset: '',
            startDate,
            endDate,
            hasManualRange: true,
            isFiltered: false,
            rangeStart: null,
            rangeEnd: null,
            error: 'The activity start date must be before the end date.',
        };
    }

    return {
        preset: '',
        startDate,
        endDate,
        hasManualRange: Boolean(startDate || endDate),
        isFiltered: Boolean(startDate || endDate),
        rangeStart: startDate ? new Date(`${startDate}T00:00:00`) : null,
        rangeEnd: endDate ? new Date(`${endDate}T23:59:59.999`) : null,
        error: '',
    };
};

/* respondMembershipRequest(request,response,teamId,statusCode,payload)
Function responsible for regulating and controlling error handling*/

const respondMembershipRequest = function respondMembershipRequest(
    request,
    response,
    teamId,
    statusCode,
    payload,
) {
    const acceptHeader = request.get('Accept') || '';

    if (payload && payload.successMessage) {
        request.session.success = payload.successMessage;
    } else if (payload && payload.warningMessage) {
        request.session.warning = payload.warningMessage;
    } else if (payload && payload.error) {
        request.session.error = payload.error;
    }

    if (acceptHeader.includes('application/json')) {
        return response.status(statusCode).json(payload);
    }
    return response.redirect(`/teams/${teamId}`);
};

const renderNewTeamPage = function renderNewTeamPage(request, response, statusCode, payload = {}) {
    return response.status(statusCode).render('pages/teamNew', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || '',
        username: request.session.username || '',
        pageTitle: TEAM_CREATE_PAGE_TITLE,
        pageSubtitle: TEAM_CREATE_PAGE_SUBTITLE,
        teamForm: payload.teamForm || {
            name: '',
            description: '',
        },
        formErrors: payload.formErrors || [],
        formError: payload.formError || '',
        formSuccess: payload.formSuccess || '',
    });
};

const respondTeamPopupRequest = function respondTeamPopupRequest(
    request,
    response,
    teamId,
    statusCode,
    payload,
) {
    if (payload.success) {
        request.session.success = 'Team information updated successfully.';
    } else if (payload.error) {
        request.session.error = payload.error;
    }

    return response.redirect(`/teams/${teamId}`);
};

//--------------------------- Main Functions ---------------------------

/*getNewTeamPage
Function responsible for rendering the new team form.*/

exports.getNewTeamPage = (request, response, next) => {
    return renderNewTeamPage(request, response, 200);
};

/*createTeam
Function responsible for validating and storing a new team.*/

exports.createTeam = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const teamForm = {
        name: typeof request.body.name === 'string' ? request.body.name.trim() : '',
        description: typeof request.body.description === 'string' ? request.body.description.trim() : '',
    };
    const imagePath = request.file ? `/images/teams/${request.file.filename}` : null;

    const formErrors = [];

    if (!teamForm.name) {
        formErrors.push('Team name is required.');
    }

    if (request.fileValidationError) {
        formErrors.push(request.fileValidationError);
    }

    if (request.file && !TEAM_ALLOWED_IMAGE_TYPES.includes(request.file.mimetype)) {
        formErrors.push('Team image must be a PNG or JPG file.');
    }

    if (formErrors.length > 0) {
        return renderNewTeamPage(request, response, 422, {
            teamForm,
            formErrors,
        });
    }

    return Team.findByName(teamForm.name)
        .then(([teams]) => {
            if (teams.length > 0) {
                return renderNewTeamPage(request, response, 409, {
                    teamForm,
                    formError: TEAM_CREATE_DUPLICATE_MESSAGE,
                });
            }

            const teamId = randomUUID();
            const team = new Team(
                teamId,
                employeeId,
                teamForm.name,
                teamForm.description || null,
                new Date(),
                imagePath,
                Team.Status.ACTIVE,
            );

            return team.save()
                .then(() => EmployeeTeamMembership.join(
                    employeeId,
                    teamId,
                    new Date(),
                    EmployeeTeamMembership.EmployeeRole.LEAD,
                ))
                .then(() => {
                    request.session.success = `Team ${teamForm.name} was created successfully.`;
                    return response.redirect('/team');
                });
        })
        .catch((error) => {
            console.log(error);
            return renderNewTeamPage(request, response, 500, {
                teamForm,
                formError: TEAM_CREATE_GENERIC_ERROR_MESSAGE,
            });
        });
};

/*updateTeamInfo
Function responsible for updating the main team information card, including the optional team image.*/

exports.updateTeamInfo = (request, response, next) => {
    const teamId = request.params.team_id;
    const employeeId = request.session.employeeId || '';
    const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const currentImage = typeof request.body.currentImage === 'string' ? request.body.currentImage.trim() : '';
    const image = getUploadedTeamImage(request) || currentImage || null;

    if (request.fileValidationError) {
        return respondTeamPopupRequest(request, response, teamId, 400, {
            error: request.fileValidationError,
        });
    }

    if (!name) {
        return respondTeamPopupRequest(request, response, teamId, 400, {
            error: 'Team name is required.',
        });
    }

    return Team.findById(teamId)
        .then(([teamRows]) => {
            const team = teamRows[0];

            if (!team) {
                return respondTeamPopupRequest(request, response, teamId, 404, {
                    error: 'The selected team was not found.',
                });
            }

            if (team.employee_responsible_id !== employeeId) {
                return respondTeamPopupRequest(request, response, teamId, 403, {
                    error: 'Only the team lead can update team information.',
                });
            }

            return Team.findByName(name).then(([nameRows]) => {
                const existingTeam = nameRows[0];

                if (existingTeam && existingTeam.team_id !== teamId) {
                    return respondTeamPopupRequest(request, response, teamId, 409, {
                        error: TEAM_CREATE_DUPLICATE_MESSAGE,
                    });
                }

                return Team.update(
                    teamId,
                    name,
                    description || null,
                    image,
                ).then(([result]) => {
                    if (!result.affectedRows) {
                        return respondTeamPopupRequest(request, response, teamId, 404, {
                            error: 'The selected team was not found.',
                        });
                    }

                    return respondTeamPopupRequest(request, response, teamId, 200, {
                        success: true,
                    });
                });
            });
        })
        .catch((error) => {
            console.log(error);
            return respondTeamPopupRequest(request, response, teamId, 500, {
                error: 'Could not update team information right now.',
            });
        });
};

/*getTeams
Function responsible for the obtention of the Teams in the Intermediate
Teams page.
This is only the initial render, returning no search results.
*/

exports.getTeams = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    Team.fetchByEmployeeId(employeeId).then(([teams, fieldData])=>{
        Team.fetchNotByEmployeeId(employeeId).then(([notTeams, fieldData])=>{
            return response.render('pages/teamDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: 'Team',
                pageSubtitle: 'Intermediate selection for own and other teams.',
                myTeams: teams.map((team) => normalizeTeam({ ...team, isMember: true }, employeeId)),
                otherTeams: notTeams.map((team) => normalizeTeam({ ...team, isMember: false }, employeeId)),
                query:'',
            });
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/home');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/home');
    })
};


/*getTeamPage
Function responsible for handling the indivual Page render:
team_info: team_info: Toda la informacion de Team que viene de la tabla Team
members: Todos los empleados dentro de su relacion con EmployeeTeam

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Team ${team_info[0].name}`,
pageSubtitle: '',
info: team_info,
members:team_members,
activities: members_activies,
projects: projects,

*/
exports.getTeamPage = (request, response, next) => {
    const teamId = request.params.team_id;
    const privilegeMap = request.session?.user?.privilege || {};
    const canAddTeamMembers = Boolean(privilegeMap['TEAM-06-02']);
    const canManageTeamMembers = Boolean(privilegeMap['TEAM-07-02']);
    const activityFilter = resolveActivityFilter(request.query);
    const activityPromise = activityFilter.error
        ? Promise.resolve({
            rows: [],
            error: '',
        })
        : (activityFilter.isFiltered
            ? Activity.getTeamMembersActivities(teamId, activityFilter.rangeStart, activityFilter.rangeEnd)
            : Activity.getTeamMembersActivities(teamId))
            .then(([rows]) => ({
                rows,
                error: '',
            }))
            .catch((error) => {
                console.log(error);
                return {
                    rows: [],
                    error: 'The activity log could not be loaded. Please try again.',
                };
            });

    Promise.all([
        Team.findById(teamId),
        Employee.getEmployeeByTeamId(teamId),
        activityPromise,
        Project.getProjectsByTeamId(teamId),
        Employee.fetchAll(),
        getLatestReport(teamId, request.session.employeeId)
    ])
        .then(async ([[teamInfo], [teamMembers], activityResponse, [teamProjects], [allEmployees], latestReport]) => {
            const teamRow = teamInfo[0];
            const memberActivities = activityResponse.rows || [];
            const activityError = activityResponse.error || '';

            if (!teamRow) {
                return renderNotFound(request, response);
            }

            const leadName = teamMembers.find(
                (member) => member.employee_id === teamRow.employee_responsible_id
            )?.full_name || 'Unknown';

            const projectsDetailedRaw = await Promise.all(
                teamProjects.map(async (project) => {
                    const [[achievements], [goals]] = await Promise.all([
                        Achievement.fetchByProject(project.project_id),
                        Goal.fetchByProject(project.project_id),
                    ]);

                    return {
                        id: project.project_id,
                        name: project.name,
                        description: project.description,
                        image: project.image || null,
                        status: project.status,
                        startDate: project.start_date,
                        endDate: project.end_date,
                        leadName: project.full_name,
                        teamRole: project.team_role,
                        activityLog: memberActivities.filter((activity) => activity.project_id === project.project_id),
                        highlights: goals.map((goal) => ({
                            title: goal.title,
                            content: goal.description,
                            createdAt: goal.created_at,
                        })),
                        achievements: achievements.map((achievement) => ({
                            title: achievement.title,
                            description: achievement.description,
                            achievementDate: achievement.achievement_date,
                        })),
                    };
                })
            );
            const projectsDetailed = projectsDetailedRaw.map(buildTeamProjectViewModel);

            const team = {
                id: teamRow.team_id,
                name: teamRow.name,
                description: teamRow.description,
                image: teamRow.image || buildAvatarUrl(teamRow.name),
                imagePath: teamRow.image || '',
                fallbackImage: buildAvatarUrl(teamRow.name),
                lead: {
                    id: teamRow.employee_responsible_id,
                    fullName: leadName,
                },
                membersDetailed: teamMembers.map((member) => ({
                    role: member.role || (
                        member.employee_id === teamRow.employee_responsible_id ? 'LEAD' : 'EMPLOYEE'
                    ),
                    joinedAt: member.joined_at,
                    employee: {
                        id: member.employee_id,
                        fullName: member.full_name,
                        //! To be modified based on image.
                        image: buildAvatarUrl(member.full_name),
                    },
                })),
                projectsDetailed,
            };

            const availableEmployees = allEmployees
                .filter(
                    (employee) => !team.membersDetailed.some(
                        (member) => member.employee.id === employee.employee_id
                    )
                )
                .map((employee) => ({
                    id: employee.employee_id,
                    fullName: employee.full_name,
                    image: buildAvatarUrl(employee.full_name),
                }));

            return response.render('pages/team', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: `Team ${team.name}`,
                pageSubtitle: '',
                team,
                defaultReportType: 'TEAM',
                defaultSubjectId: team.id,
                reportSubjects: {
                    employees: [],
                    teams: [
                        {
                            id: team.id,
                            name: team.name,
                            label: team.name,
                        },
                    ],
                    projects: [],
                },
                latestReport: latestReport,
                quickReport: '',
                currentEmployeeId: request.session.employeeId || null,
                isMember: team.membersDetailed.some(
                    (member) => member.employee.id === request.session.employeeId
                ),
                activitySections: buildActivitySections(memberActivities),
                activityFilter,
                activityError: activityFilter.error || activityError || '',
                availableEmployees,
                canAddTeamMembers,
                canManageTeamMembers,
            });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = `Error loading team ${teamId}.`;
            return response.redirect('/team');
        });
};


//!Function to modify as approval is considered on Roles instead of Privilege
/*toggleTeamMembership
*/

exports.toggleTeamMembership = (request, response, next) => {
    const teamId = request.params.team_id;
    const isAddMemberRequest = Object.prototype.hasOwnProperty.call(request.body, 'employeeId');
    const targetEmployeeId = isAddMemberRequest
        ? request.body.employeeId
        : request.session.employeeId;
    let flashType = '';
    let flashMessage = '';

    if (!targetEmployeeId) {
        request.session.error = isAddMemberRequest
            ? 'Select a valid employee to add to the team.'
            : 'You must be logged in to update team membership.';
        return response.redirect(`/teams/${teamId}`);
    }

    EmployeeTeamMembership.fetchByEmployeeAndTeam(targetEmployeeId, teamId)
        .then(([memberships]) => {
            const membership = memberships[0];

            if (!membership) {
                flashType = 'success';
                flashMessage = isAddMemberRequest
                    ? 'Member added to the team.'
                    : 'You joined the team.';
                return EmployeeTeamMembership.join(targetEmployeeId, teamId);
            }

            if (membership.left_at) {
                flashType = 'success';
                flashMessage = isAddMemberRequest
                    ? 'Member added to the team.'
                    : 'You joined the team.';
                return EmployeeTeamMembership.update(targetEmployeeId, teamId, {
                    joined_at: new Date(),
                    left_at: null,
                    role: membership.role || EmployeeTeamMembership.EmployeeRole.EMPLOYEE,
                });
            }

            if (isAddMemberRequest) {
                flashType = 'warning';
                flashMessage = 'That employee is already a member of this team.';
                return Promise.resolve();
            }

            flashType = 'success';
            flashMessage = 'You left the team.';
            return EmployeeTeamMembership.leave(targetEmployeeId, teamId);
        })
        .then(() => {
            if (flashType && flashMessage) {
                request.session[flashType] = flashMessage;
            }

            return response.redirect(`/teams/${teamId}`);
        })
        .catch((error) => {
            console.log(error);
            request.session.error = `Error updating membership for team ${teamId}.`;
            return response.redirect(`/teams/${teamId}`);
        });
};

/*addTeamMember
Function responsible for adding a new member to the team
by creating a relationship between EmployeeTeam*/

exports.addTeamMember = (request, response, next) => {
    const teamId = request.params.team_id;
    const employeeId = String(request.body.employeeId || '').trim();
    const role = resolveTeamMemberRole(request.body.role);

    if (!employeeId) {
        return respondMembershipRequest(request, response, teamId, 400, {
            error: 'Select a valid employee to add to the team.',
        });
    }

    if (!role) {
        return respondMembershipRequest(request, response, teamId, 400, {
            error: 'Select a valid team role for the member.',
        });
    }

    EmployeeTeamMembership.fetchByEmployeeAndTeam(employeeId, teamId).then(([memberships]) => {
        const membership = memberships[0];

        if (!membership) {
            return EmployeeTeamMembership.join(employeeId, teamId, new Date(), role).then(() => {
                return respondMembershipRequest(request, response, teamId, 200, {
                    success: true,
                    successMessage: 'Member added to the team.',
                });
            });
        }

        if (membership.left_at) {
            return EmployeeTeamMembership.update(employeeId, teamId, {
                joined_at: new Date(),
                left_at: null,
                role,
            }).then(() => {
                return respondMembershipRequest(request, response, teamId, 200, {
                    success: true,
                    successMessage: 'Member added to the team.',
                });
            });
        }
        return respondMembershipRequest(request, response, teamId, 200, {
            success: true,
            warningMessage: 'That employee is already a member of this team.',
        });
    })
    .catch((error) => {
        console.log(error);
        return respondMembershipRequest(request, response, teamId, 500, {
            error: `Error adding a member to team ${teamId}.`,
        });
    });
};

/*updateTeamMemberRole
Function responsible for updating the role of an active team member.*/

exports.updateTeamMemberRole = (request, response, next) => {
    const teamId = request.params.team_id;
    const employeeId = request.params.employee_id;
    const role = resolveTeamMemberRole(request.body.role);

    if (!role) {
        return respondMembershipRequest(request, response, teamId, 400, {
            error: 'Select a valid role (LEAD or EMPLOYEE).',
        });
    }

    return Promise.all([
        Team.findById(teamId),
        EmployeeTeamMembership.fetchByEmployeeAndTeam(employeeId, teamId),
    ])
        .then(([[teamRows], [memberships]]) => {
            const teamRow = teamRows[0];
            const membership = memberships[0];

            if (!teamRow) {
                return respondMembershipRequest(request, response, teamId, 404, {
                    error: `Team ${teamId} was not found.`,
                });
            }

            if (!membership || membership.left_at) {
                return respondMembershipRequest(request, response, teamId, 404, {
                    error: 'Only active team members can have their role updated.',
                });
            }

            if (
                teamRow.employee_responsible_id === employeeId
                && role !== EmployeeTeamMembership.EmployeeRole.LEAD
            ) {
                return respondMembershipRequest(request, response, teamId, 400, {
                    error: 'The responsible team lead must keep LEAD role.',
                });
            }

            if ((membership.role || EmployeeTeamMembership.EmployeeRole.EMPLOYEE) === role) {
                return respondMembershipRequest(request, response, teamId, 200, {
                    success: true,
                    warningMessage: 'That member already has the selected role.',
                });
            }

            return EmployeeTeamMembership.update(employeeId, teamId, {
                joined_at: membership.joined_at,
                left_at: membership.left_at,
                role,
            }).then(() => {
                return respondMembershipRequest(request, response, teamId, 200, {
                    success: true,
                    successMessage: 'Team member role updated successfully.',
                });
            });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, teamId, 500, {
                error: `Error updating role for team ${teamId}.`,
            });
        });
};

/*removeTeamMember
Function responsible for eliminating en employee from a team membership*/

exports.removeTeamMember = (request, response, next) => {
    const teamId = request.params.team_id;
    const employeeId = request.params.employee_id;

    Promise.all([
        Team.findById(teamId),
        EmployeeTeamMembership.fetchByEmployeeAndTeam(employeeId, teamId),
    ])
    .then(([[teamRows], [memberships]]) => {
        const teamRow = teamRows[0];
        const membership = memberships[0];

        if (!teamRow) {
            return respondMembershipRequest(request, response, teamId, 404, {
                error: `Team ${teamId} was not found.`,
            });
        }

        if (teamRow.employee_responsible_id === employeeId) {
            return respondMembershipRequest(request, response, teamId, 400, {
                error: 'The team lead cannot be removed from the team.',
            });
        }

        //? Es posible que alguien se elimine a si mismo a traves de este metodo?

        if (employeeId === request.session.employeeId) {
            return respondMembershipRequest(request, response, teamId, 400, {
                error: 'Use the Leave Team action to remove yourself.',
            });
        }

        if (!membership || membership.left_at) {
            return respondMembershipRequest(request, response, teamId, 404, {
                error: 'That employee is not an active member of this team.',
            });
        }

        return EmployeeTeamMembership.leave(employeeId, teamId)
            .then(() => respondMembershipRequest(request, response, teamId, 200, {
                success: true,
                successMessage: 'Member removed from the team.',
            }));
    })
    .catch((error) => {
        console.log(error);
        return respondMembershipRequest(request, response, teamId, 500, {
            error: `Error removing a member from team ${teamId}.`,
        });
    });
};

/*deleteTeam
Function responsible for disabling a team from the delete team popup.*/

exports.deleteTeam = (request, response, next) => {
    const teamId = request.params.team_id;
    const employeeId = request.session.employeeId || '';
    const acceptHeader = request.get('Accept') || '';
    const respondDeleteTeam = function respondDeleteTeam(statusCode, payload, redirectTo = '/team') {
        if (payload.successMessage) {
            request.session.success = payload.successMessage;
        } else if (payload.error) {
            request.session.error = payload.error;
        }

        if (acceptHeader.includes('application/json')) {
            return response.status(statusCode).json({
                ...payload,
                redirectTo,
            });
        }

        return response.redirect(redirectTo);
    };

    return Team.findById(teamId)
        .then(([teamRows]) => {
            const team = teamRows[0];

            if (!team) {
                return respondDeleteTeam(404, {
                    success: false,
                    error: 'Team not found.',
                });
            }

            if (team.employee_responsible_id !== employeeId) {
                return respondDeleteTeam(403, {
                    success: false,
                    error: 'Only the team lead can delete this team.',
                }, `/team/${teamId}`);
            }

            return Team.disableTeam(teamId)
                .then(([result]) => {
                    if (!result.affectedRows) {
                        return respondDeleteTeam(500, {
                            success: false,
                            error: 'The team could not be deleted right now.',
                        }, `/team/${teamId}`);
                    }

                    return respondDeleteTeam(200, {
                        success: true,
                        successMessage: 'Team deleted successfully.',
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return respondDeleteTeam(500, {
                success: false,
                error: 'The team could not be deleted right now.',
            });
        });
};

//! Provisional function to load Team Intermediate
/*searchTeams
Function responsible for returning filtered team-directory HTML and autocomplete suggestions.*/

exports.searchTeams = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';

    return Promise.all([
        Team.searchDirectory(employeeId, query),
        Team.getDirectorySuggestions(employeeId, query),
    ]).then(([
        [directoryTeams],
        [suggestionTeams],
    ]) => {
        const myTeams = [];
        const otherTeams = [];
        const suggestions = suggestionTeams.map((team) => {
            const normalizedTeam = normalizeTeam(team, employeeId);
            return {
                id: normalizedTeam.id,
                name: normalizedTeam.name,
                leadName: normalizedTeam.leadName,
                isMember: normalizedTeam.isMember,
            };
        });

        directoryTeams.forEach((team) => {
            const normalizedTeam = normalizeTeam(team, employeeId);

            if (normalizedTeam.isMember) {
                myTeams.push(normalizedTeam);
                return;
            }

            otherTeams.push(normalizedTeam);
        });

        return response.render('partials/teamDirectory/teamDirectoryResults', {
            layout: false,
            myTeams,
            otherTeams,
        }, (renderError, resultsHtml) => {
            if (renderError) {
                console.log(renderError);
                return response.status(500).json({
                    error: 'Unable to search teams right now.',
                });
            }

            return response.json({
                query,
                resultsHtml,
                suggestions,
                totalTeams: directoryTeams.length,
            });
        });
    }).catch((error) => {
        console.log(error);
        return response.status(500).json({
            error: 'Unable to search teams right now.',
        });
    });
};

/*getTeamMembers
Function responsible for returning all the information of the Employees
related to a Team*/

exports.getTeamMembers = (request,response,next)=>{
    
}
