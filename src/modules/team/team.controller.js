/*
Title: team.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Team = require('../../models/team');
const Employee = require('../../models/employee');
const EmployeeTeamMembership = require('../../models/employeeTeamMembership');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');


//--------------------------- Auxiliar Functions ---------------------------

/*buildAvatarUrl(label)
Auxiliar function responsible for creating a fallback avatar based on a label.*/

const buildAvatarUrl = function buildAvatarUrl(label) {
    const normalizedLabel = String(label || 'Unknown').trim() || 'Unknown';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(normalizedLabel)}&background=fbfbfe&color=1f2937`;
};

/*normalizeTeam(team)
Function responsible for the normalization of a team given as a parameter*/

const normalizeTeam = function normalizeTeam(team) {
    return {
        id: team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        leadName:
            team.full_name ??
            'Pending assignment',
        description: team.description ?? 'No team description has been added yet.',
        image: buildAvatarUrl(team.name),
        isMember: Boolean(team.isMember ?? team.is_member),
    };
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
        rangeStart.setDate(rangeStart.getDate() - 29);

        return {
            preset: 'month',
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

    if (acceptHeader.includes('application/json')) {
        return response.status(statusCode).json(payload);
    }

    if (payload && payload.error) {
        request.session.error = payload.error;
    }
    return response.redirect(`/teams/${teamId}`);
};

//--------------------------- Main Functions ---------------------------

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
                myTeams: teams.map((team) => normalizeTeam({ ...team, isMember: true })),
                otherTeams: notTeams.map((team) => normalizeTeam({ ...team, isMember: false })),
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
    ])
        .then(async ([[teamInfo], [teamMembers], activityResponse, [teamProjects], [allEmployees]]) => {
            const teamRow = teamInfo[0];
            const memberActivities = activityResponse.rows || [];
            const activityError = activityResponse.error || '';

            if (!teamRow) {
                request.session.error = `Error loading team ${teamId}. Team information not found.`;
                return response.redirect('/team');
            }

            const leadName = teamMembers.find(
                (member) => member.employee_id === teamRow.employee_responsible_id
            )?.full_name || 'Unknown';

            const projectsDetailed = await Promise.all(
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

            const team = {
                id: teamRow.team_id,
                name: teamRow.name,
                description: teamRow.description,
                image: teamRow.image || null,
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
                //TODO: Review code
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
                latestReports: {},
                quickReport: '',
                currentEmployeeId: request.session.employeeId || null,
                isMember: team.membersDetailed.some(
                    (member) => member.employee.id === request.session.employeeId
                ),
                activitySections: buildActivitySections(memberActivities),
                activityFilter,
                activityError: activityFilter.error || activityError || '',
                availableEmployees,
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
                return EmployeeTeamMembership.join(targetEmployeeId, teamId);
            }

            if (membership.left_at) {
                return EmployeeTeamMembership.update(targetEmployeeId, teamId, {
                    joined_at: new Date(),
                    left_at: null,
                    role: membership.role || EmployeeTeamMembership.EmployeeRole.EMPLOYEE,
                });
            }

            if (isAddMemberRequest) {
                return Promise.resolve();
            }

            return EmployeeTeamMembership.leave(targetEmployeeId, teamId);
        })
        .then(() => response.redirect(`/teams/${teamId}`))
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

    if (!employeeId) {
        return respondMembershipRequest(request, response, teamId, 400, {
            error: 'Select a valid employee to add to the team.',
        });
    }

    EmployeeTeamMembership.fetchByEmployeeAndTeam(employeeId, teamId).then(([memberships]) => {
        const membership = memberships[0];

        if (!membership) {
            return EmployeeTeamMembership.join(employeeId, teamId);
        }

        if (membership.left_at) {
            return EmployeeTeamMembership.update(employeeId, teamId, {
                joined_at: new Date(),
                left_at: null,
                role: membership.role || EmployeeTeamMembership.EmployeeRole.EMPLOYEE,
            });
        }
        return Promise.resolve();
    })
    .then(() => respondMembershipRequest(request, response, teamId, 200, {
        success: true,
    }))
    .catch((error) => {
        console.log(error);
        return respondMembershipRequest(request, response, teamId, 500, {
            error: `Error adding a member to team ${teamId}.`,
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

        return EmployeeTeamMembership.leave(employeeId, teamId)
            .then(() => respondMembershipRequest(request, response, teamId, 200, {
                success: true,
            }));
    })
    .catch((error) => {
        console.log(error);
        return respondMembershipRequest(request, response, teamId, 500, {
            error: `Error removing a member from team ${teamId}.`,
        });
    });
};

//! Provisional function to load Team Intermediate

exports.searchTeams = (request, response, next) => {
    return response.json({
                        query: '',
                        resultsHtml: '',
                        suggestions: '',
                        totalTeams: '',
                    });
};

/*getTeamMembers
Function responsible for returning all the information of the Employees
related to a Team*/

exports.getTeamMembers = (request,response,next)=>{
    
}
