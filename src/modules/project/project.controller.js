/*
Title: project.controller.js
Last modification: April 2,2026
Modified by: Alexis Berthou
*/

const Project = require('../../models/project');
const Goal = require('../../models/goal');
const Achievement = require('../../models/achievement');
const Highlight = require('../../models/highlight');
const Activity = require('../../models/activity');
const Collaboration = require('../../models/collaboration');
const ProjectTeam = require('../../models/projectTeamAssignment');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Team = require('../../models/team');
const renderNotFound = require('../../utils/renderNotFound');

const PAGE_TITLE = 'Project';
const PAGE_SUBTITLE = 'Intermediate selection for own and other projects.';
const PROJECT_CREATE_PAGE_TITLE = 'New Project';
const PROJECT_CREATE_PAGE_SUBTITLE = 'Register a new project and assign yourself as the responsible lead.';
const PROJECT_CREATE_DUPLICATE_MESSAGE = 'A project with that name already exists.';
const PROJECT_CREATE_GENERIC_ERROR_MESSAGE = 'The project could not be created right now.';
const PROJECT_ALLOWED_STATUS = ['PLANNED', 'IN PROGRESS', 'ON HOLD', 'COMPLETED', 'CANCELLED'];
const GOAL_ALLOWED_STATUS = ['PLANNED', 'IN PROGRESS', 'ON HOLD', 'COMPLETED', 'CANCELLED'];
const PROJECT_MEMBER_ROLE_MAX_LENGTH = 150;
const PROJECT_TEAM_DESCRIPTION_MAX_LENGTH = 50;

exports.ensureProjectExists = (request, response, next) => {
    return Project.findById(request.params.project_id)
        .then(([projectRows]) => {
            if (!projectRows.length) {
                return renderNotFound(request, response);
            }

            return next();
        })
        .catch(next);
};

const resolveProjectMemberRole = function resolveProjectMemberRole(rawRole) {
    const normalizedRole = String(rawRole || '').trim().replace(/\s+/g, ' ');

    if (!normalizedRole) {
        return null;
    }

    if (normalizedRole.length > PROJECT_MEMBER_ROLE_MAX_LENGTH) {
        return null;
    }

    return normalizedRole;
};

const isLeadProjectRole = function isLeadProjectRole(role) {
    return /\blead\b/i.test(String(role || '').trim());
};

const resolveProjectTeamDescription = function resolveProjectTeamDescription(rawDescription) {
    const normalizedDescription = String(rawDescription || '').trim();

    if (!normalizedDescription) {
        return null;
    }

    if (normalizedDescription.length > PROJECT_TEAM_DESCRIPTION_MAX_LENGTH) {
        return null;
    }

    return normalizedDescription;
};

const formatDateLabel = function formatDateLabel(value, fallback = '') {
    if (!value) {
        return fallback;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const buildActivitySections = function buildActivitySections(activityRows) {
    const sections = {};

    activityRows.forEach((activity) => {
        const completedAt = activity.completed_at ? new Date(activity.completed_at) : null;
        const dayLabel = completedAt && !Number.isNaN(completedAt.getTime())
            ? completedAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            })
            : 'Unknown date';
        const authorName = activity.full_name || 'Unknown';

        if (!sections[dayLabel]) {
            sections[dayLabel] = [];
        }

        sections[dayLabel].push({
            id: activity.activity_id || null,
            title: activity.title || 'Untitled activity',
            description: activity.description || '',
            authorName,
            authorInitials: authorName
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0].toUpperCase())
                .join('') || '?',
            activityTimeLabel: completedAt && !Number.isNaN(completedAt.getTime())
                ? completedAt.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                })
                : '',
        });
    });

    return Object.keys(sections).map((dayLabel) => ({
        dayLabel,
        items: sections[dayLabel],
    }));
};

const isValidDateInput = function isValidDateInput(value) {
    if (!value) {
        return true;
    }

    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
};

/*formatDateInput(value)
Function responsible for converting DB date values into YYYY-MM-DD strings, so date inputs in popups can show existing values.*/

const formatDateInput = function formatDateInput(value) {
    if (!value) {
        return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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

const respondMembershipRequest = function respondMembershipRequest(
    request,
    response,
    projectId,
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

    return response.redirect(`/projects/${projectId}`);
};

/*respondProjectPopupRequest(request, response, projectId, statusCode, payload)
Function responsible for returning JSON for AJAX popup submits and keeping a safe redirect fallback if the request was not AJAX.*/

const respondProjectPopupRequest = function respondProjectPopupRequest(
    request,
    response,
    projectId,
    statusCode,
    payload,
) {
    const acceptHeader = request.get('Accept') || '';

    if (acceptHeader.includes('application/json')) {
        return response.status(statusCode).json(payload);
    }

    return response.redirect(`/projects/${projectId}`);
};

/*getProjects
Function responsible for rendering the intermediate projects page.*/

exports.getProjects = (request, response, next) => {
    const employeeId = request.session.employeeId || '';

    Promise.all([
        Project.fetchByEmployeeId(employeeId),
        Project.fetchNotByEmployeeId(employeeId),
    ]).then(([
        [projects],
        [notProjects],
    ]) => {
        return response.render('pages/projectDirectory', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: PAGE_TITLE,
            pageSubtitle: PAGE_SUBTITLE,
            myProjects: projects.map((project) => ({
                id: project.project_id,
                name: project.name,
                leadName: project.lead_name || 'Pending assignment',
                description: project.description,
                image: project.image || null,
                isMember: Boolean(project.is_member || project.isMember),
            })),
            otherProjects: notProjects.map((project) => ({
                id: project.project_id,
                name: project.name,
                leadName: project.lead_name || 'Pending assignment',
                description: project.description,
                image: project.image || null,
                isMember: Boolean(project.is_member || project.isMember),
            })),
            query: '',
        });
    }).catch((error) => {
        console.log(error);
        return response.redirect('/home');
    });
};

/*getNewProjectPage
Function responsible for rendering the new project form.*/

exports.getNewProjectPage = (request, response, next) => {
    return response.render('pages/projectNew', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || '',
        username: request.session.username || '',
        pageTitle: PROJECT_CREATE_PAGE_TITLE,
        pageSubtitle: PROJECT_CREATE_PAGE_SUBTITLE,
        projectForm: {
            name: '',
            description: '',
            startDate: '',
            endDate: '',
        },
        formErrors: [],
        formError: '',
        formSuccess: '',
    });
};

/*createProject
Function responsible for validating and storing a new project.*/

exports.createProject = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const projectForm = {
        name: typeof request.body.name === 'string' ? request.body.name.trim() : '',
        description: typeof request.body.description === 'string' ? request.body.description.trim() : '',
        startDate: typeof request.body.startDate === 'string' ? request.body.startDate.trim() : '',
        endDate: typeof request.body.endDate === 'string' ? request.body.endDate.trim() : '',
    };

    const formErrors = [];

    if (!projectForm.name) {
        formErrors.push('Project name is required.');
    }

    if (!projectForm.startDate) {
        formErrors.push('Start date is required.');
    }

    if (formErrors.length > 0) {
        return response.status(422).render('pages/projectNew', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: PROJECT_CREATE_PAGE_TITLE,
            pageSubtitle: PROJECT_CREATE_PAGE_SUBTITLE,
            projectForm,
            formErrors,
            formError: '',
            formSuccess: '',
        });
    }

    return Project.findByName(projectForm.name).then(([projects]) => {
        if (projects.length > 0) {
            return response.status(409).render('pages/projectNew', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: PROJECT_CREATE_PAGE_TITLE,
                pageSubtitle: PROJECT_CREATE_PAGE_SUBTITLE,
                projectForm,
                formErrors: [],
                formError: PROJECT_CREATE_DUPLICATE_MESSAGE,
                formSuccess: '',
            });
        }

        const project = new Project(
            '',
            employeeId,
            projectForm.name,
            projectForm.description || null,
            Project.Status.IN_PROGRESS,
            projectForm.startDate || null,
            projectForm.endDate || null,
            new Date(),
        );

        return project.save().then(() => {
            request.session.success = `Project ${projectForm.name} was created successfully.`;
            return response.redirect('/projects');
        });
    }).catch((error) => {
        console.log(error);
        return response.status(500).render('pages/projectNew', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: PROJECT_CREATE_PAGE_TITLE,
            pageSubtitle: PROJECT_CREATE_PAGE_SUBTITLE,
            projectForm,
            formErrors: [],
            formError: PROJECT_CREATE_GENERIC_ERROR_MESSAGE,
            formSuccess: '',
        });
    });
};

/*getProjectPage
Function responsible for rendering the detailed view of a specific project.*/

exports.getProjectPage = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const privilegeMap = request.session?.user?.privilege || {};
    const canAddProjectMembers = Boolean(privilegeMap['PROJ-05-02']);
    const canManageProjectMembers = Boolean(privilegeMap['PROJ-06-02']);
    const activityFilter = resolveActivityFilter(request.query);
    const activityPromise = activityFilter.error
        ? Promise.resolve({
            rows: [],
            error: '',
        })
        : (activityFilter.isFiltered
            ? Activity.fetchByProjectBetween(projectId, activityFilter.rangeStart, activityFilter.rangeEnd)
            : Activity.fetchByProject(projectId))
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
        Project.findById(projectId),
        Achievement.fetchByProject(projectId),
        Goal.fetchByProject(projectId),
        Report.fetchLatestByProjectAndEmployee(projectId, employeeId),
        Highlight.fetchByProject(projectId),
        activityPromise,
        ProjectTeam.fetchDetailedByProject(projectId),
        Collaboration.fetchDetailedByProject(projectId),
        Collaboration.findActiveByProjectAndEmployee(projectId, employeeId),
        Employee.fetchAll(),
        Team.findAll(),
    ]).then(([
        [projectRows],
        [achievementRows],
        [goalRows],
        [reportRows],
        [highlightRows],
        activityResponse,
        [teamRows],
        [memberRows],
        [activeCollaborationRows],
        [allEmployees],
        [allTeams],
    ]) => {
        const activityRows = activityResponse.rows || [];
        const activityError = activityResponse.error || '';

        if (!projectRows || projectRows.length === 0) {
            return renderNotFound(request, response);
        }

        const project = projectRows[0];
        let projectMembership = {
            isMember: false,
            canToggle: true,
            buttonLabel: 'Join Project',
        };

        if (project.employee_responsible_id === employeeId) {
            projectMembership = {
                isMember: true,
                canToggle: false,
                buttonLabel: 'Project Lead',
            };
        } else if (activeCollaborationRows.length > 0) {
            projectMembership = {
                isMember: true,
                canToggle: true,
                buttonLabel: 'Leave Project',
            };
        }

        const currentMemberIds = new Set(memberRows.map((member) => member.employee_id));
        currentMemberIds.add(project.employee_responsible_id);

        const availableEmployees = allEmployees
            .filter((employee) => !currentMemberIds.has(employee.employee_id))
            .map((employee) => ({
                id: employee.employee_id,
                fullName: employee.full_name,
            }));

        const currentTeamIds = new Set(teamRows.map((team) => team.team_id));
        const availableTeams = allTeams
            .filter((team) => !currentTeamIds.has(team.team_id))
            .map((team) => ({
                id: team.team_id,
                name: team.name || 'Unnamed team',
            }));

        return response.render('pages/project', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: PAGE_TITLE,
            error: '',
            project: {
                ...project,
                id: project.project_id,
                name: project.name || 'Project',
                description: project.description || 'No project description has been added yet.',
                status: project.status || 'Unknown',
                startDateLabel: formatDateLabel(project.start_date, 'N/A'),
                endDateLabel: formatDateLabel(project.end_date, 'In progress'),
                startDateInput: formatDateInput(project.start_date),
                endDateInput: formatDateInput(project.end_date),
                lead: {
                    fullName: project.lead_name || 'Unknown',
                },
                achievementsDetailed: achievementRows.map((achievement) => ({
                    id: achievement.achievement_id || null,
                    title: achievement.title || 'Untitled achievement',
                    description: achievement.description || 'No achievement description available.',
                    authorName: achievement.full_name || 'Unknown',
                    achievementDateLabel: formatDateLabel(achievement.achievement_date, 'Date unavailable'),
                    achievementDate: formatDateInput(achievement.achievement_date),
                    evidenceLink: achievement.evidence_link || '',
                })),
                goalsDetailed: goalRows.map((goal) => ({
                    id: goal.goal_id || null,
                    title: goal.title || 'Untitled goal',
                    description: goal.description || 'No goal description available.',
                    status: goal.status || 'Unknown',
                    dueDateLabel: formatDateLabel(goal.due_date, 'No due date'),
                    dueDate: formatDateInput(goal.due_date),
                    createdAtLabel: formatDateLabel(goal.created_at, 'Date unavailable'),
                    authorName: goal.full_name || 'Unknown',
                })),
                latestReportsDetailed: reportRows.map((report) => ({
                    id: report.report_id || null,
                    createdAtLabel: formatDateLabel(report.created_at, 'Date unavailable'),
                    periodStartLabel: formatDateLabel(report.period_start, 'Unknown'),
                    periodEndLabel: formatDateLabel(report.period_end, 'Unknown'),
                    modelLabel: [report.model_name, report.model_version].filter(Boolean).join(' ') || 'AI model unavailable',
                    preview: report.ai_output_text
                        ? `${String(report.ai_output_text).slice(0, 180)}${String(report.ai_output_text).length > 180 ? '...' : ''}`
                        : 'No report preview available.',
                })),
                highlightsDetailed: highlightRows.map((highlight) => ({
                    id: highlight.highlight_id || null,
                    title: highlight.title || 'Untitled highlight',
                    content: highlight.content || 'No highlight content available.',
                    authorName: highlight.full_name || 'Unknown',
                    createdAtLabel: formatDateLabel(highlight.created_at, 'Date unavailable'),
                })),
                teamsDetailed: teamRows.map((team) => ({
                    id: team.team_id || null,
                    name: team.name || 'Unnamed team',
                    description: team.description || 'No team description available.',
                    image: team.image || null,
                    status: team.status || 'Unknown',
                    assignmentDescription: team.team_role || '',
                    memberCount: Number(team.member_count || 0),
                    joinedAtLabel: formatDateLabel(team.joined_at, 'Date unavailable'),
                })),
                membersDetailed: memberRows.map((member) => ({
                    id: member.employee_id || null,
                    fullName: member.full_name || 'Unknown',
                    role: member.role || '',
                    description: member.description || 'Active collaborator',
                    startedAtLabel: formatDateLabel(member.started_at, 'Date unavailable'),
                })),
            },
            projectName: project.name || 'Project',
            projectDescription: project.description || 'No project description has been added yet.',
            projectMembership,
            activitySections: buildActivitySections(activityRows),
            activityFilter: {
                preset: activityFilter.preset,
                startDate: activityFilter.startDate,
                endDate: activityFilter.endDate,
                hasManualRange: activityFilter.hasManualRange,
                isFiltered: activityFilter.isFiltered,
            },
            activityError: activityFilter.error || activityError || '',
            defaultReportType: 'PROJECT',
            defaultSubjectId: project.project_id,
            reportSubjects: {
                employees: [],
                teams: [],
                projects: [
                    {
                        id: project.project_id,
                        name: project.name || 'Project',
                        label: project.name || 'Project',
                    },
                ],
            },
            latestReports: {
                PROJECT: reportRows.length > 0
                    ? {
                        subjectLabel: project.name || 'Project',
                        createdAt: reportRows[0].created_at,
                        periodStart: reportRows[0].period_start,
                        periodEnd: reportRows[0].period_end,
                    }
                    : null,
            },
            quickReport: '',
            currentEmployeeId: employeeId,
            availableEmployees,
            availableTeams,
            canAddProjectMembers,
            canManageProjectMembers,
        });
    }).catch((error) => {
        console.log(error);
        next(error);
    });
};

exports.addProjectMember = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = String(request.body.employeeId || '').trim();
    const role = resolveProjectMemberRole(request.body.role);

    if (!employeeId) {
        return respondMembershipRequest(request, response, projectId, 400, {
            error: 'Select a valid employee to add to the project.',
        });
    }

    if (!role) {
        return respondMembershipRequest(request, response, projectId, 400, {
            error: `Provide a role of up to ${PROJECT_MEMBER_ROLE_MAX_LENGTH} characters.`,
        });
    }

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondMembershipRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            if (project.employee_responsible_id === employeeId) {
                return respondMembershipRequest(request, response, projectId, 400, {
                    error: 'The project lead is already part of the project.',
                });
            }

            return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
                .then(([memberships]) => {
                    if (memberships.length > 0) {
                        return respondMembershipRequest(request, response, projectId, 200, {
                            success: true,
                            warningMessage: 'That employee is already a member of this project.',
                        });
                    }

                    return Collaboration.fetchByProject(projectId)
                        .then(([projectCollaborations]) => {
                            const existingCollaboration = projectCollaborations.find((membership) => (
                                membership.employee_id === employeeId
                                && membership.ended_at
                            ));

                            if (existingCollaboration) {
                                return Collaboration.update(existingCollaboration.collaboration_id, {
                                    description: existingCollaboration.description || 'Added from project detail page.',
                                    started_at: new Date(),
                                    ended_at: null,
                                    role,
                                });
                            }

                            return Collaboration.joinProject(projectId, employeeId, 'Added from project detail page.', role);
                        })
                        .then(() => respondMembershipRequest(request, response, projectId, 200, {
                            success: true,
                            successMessage: 'Member added to the project.',
                        }));
                });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, projectId, 500, {
                error: `Error adding a member to project ${projectId}.`,
            });
        });
};

exports.updateProjectMemberRole = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.params.employee_id;
    const role = resolveProjectMemberRole(request.body.role);

    if (!role) {
        return respondMembershipRequest(request, response, projectId, 400, {
            error: `Provide a role of up to ${PROJECT_MEMBER_ROLE_MAX_LENGTH} characters.`,
        });
    }

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondMembershipRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            if (project.employee_responsible_id === employeeId && !isLeadProjectRole(role)) {
                return respondMembershipRequest(request, response, projectId, 400, {
                    error: 'The responsible project lead must keep a role containing "Lead".',
                });
            }

            return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
                .then(([memberships]) => {
                    const membership = memberships[0];

                    if (!membership) {
                        return respondMembershipRequest(request, response, projectId, 404, {
                            error: 'Only active project members can have their role updated.',
                        });
                    }

                    if ((membership.role || '') === role) {
                        return respondMembershipRequest(request, response, projectId, 200, {
                            success: true,
                            warningMessage: 'That member already has the selected role.',
                        });
                    }

                    return Collaboration.update(membership.collaboration_id, {
                        role,
                    }).then(() => respondMembershipRequest(request, response, projectId, 200, {
                        success: true,
                        successMessage: 'Project member role updated successfully.',
                    }));
                });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, projectId, 500, {
                error: `Error updating member role in project ${projectId}.`,
            });
        });
};

exports.removeProjectMember = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.params.employee_id;

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondMembershipRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            if (project.employee_responsible_id === employeeId) {
                return respondMembershipRequest(request, response, projectId, 400, {
                    error: 'The project lead cannot be removed from the project.',
                });
            }

            if (employeeId === request.session.employeeId) {
                return respondMembershipRequest(request, response, projectId, 400, {
                    error: 'Use the Leave Project action to remove yourself.',
                });
            }

            return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
                .then(([memberships]) => {
                    if (!memberships.length) {
                        return respondMembershipRequest(request, response, projectId, 404, {
                            error: 'That employee is not currently a member of this project.',
                        });
                    }

                    return Collaboration.leaveProject(projectId, employeeId)
                        .then(() => respondMembershipRequest(request, response, projectId, 200, {
                            success: true,
                            successMessage: 'Member removed from the project.',
                        }));
                });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, projectId, 500, {
                error: `Error removing a member from project ${projectId}.`,
            });
        });
};

exports.addProjectTeam = (request, response, next) => {
    const projectId = request.params.project_id;
    const teamId = String(request.body.teamId || '').trim();
    const teamDescription = resolveProjectTeamDescription(request.body.description);

    if (!teamId) {
        return respondMembershipRequest(request, response, projectId, 400, {
            error: 'Select a valid team to add to the project.',
        });
    }

    if (!teamDescription) {
        return respondMembershipRequest(request, response, projectId, 400, {
            error: `Add a team description of up to ${PROJECT_TEAM_DESCRIPTION_MAX_LENGTH} characters.`,
        });
    }

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondMembershipRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            return Team.findById(teamId).then(([teamRows]) => {
                const team = teamRows[0];

                if (!team) {
                    return respondMembershipRequest(request, response, projectId, 404, {
                        error: 'The selected team was not found.',
                    });
                }

                return ProjectTeam.fetchByTeamAndProject(teamId, projectId)
                    .then(([assignments]) => {
                        if (assignments.length > 0) {
                            return respondMembershipRequest(request, response, projectId, 200, {
                                success: true,
                                warningMessage: 'That team is already assigned to this project.',
                            });
                        }

                        const projectTeam = new ProjectTeam(
                            teamId,
                            projectId,
                            teamDescription,
                            new Date(),
                        );

                        return projectTeam.save()
                            .then(() => respondMembershipRequest(request, response, projectId, 200, {
                                success: true,
                                successMessage: 'Team added to the project.',
                            }));
                    });
            });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, projectId, 500, {
                error: `Error adding a team to project ${projectId}.`,
            });
        });
};

exports.removeProjectTeam = (request, response, next) => {
    const projectId = request.params.project_id;
    const teamId = request.params.team_id;

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondMembershipRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            return ProjectTeam.fetchByTeamAndProject(teamId, projectId)
                .then(([assignments]) => {
                    if (!assignments.length) {
                        return respondMembershipRequest(request, response, projectId, 404, {
                            error: 'That team is not currently assigned to this project.',
                        });
                    }

                    return ProjectTeam.delete(teamId, projectId)
                        .then(() => respondMembershipRequest(request, response, projectId, 200, {
                            success: true,
                            successMessage: 'Team removed from the project.',
                        }));
                });
        })
        .catch((error) => {
            console.log(error);
            return respondMembershipRequest(request, response, projectId, 500, {
                error: `Error removing a team from project ${projectId}.`,
            });
        });
};

exports.joinProject = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';

    Project.findById(projectId).then(([projectRows]) => {
        if (!projectRows.length) {
            request.session.error = 'The selected project was not found.';
            return response.redirect('/projects');
        }

        if (projectRows[0].employee_responsible_id === employeeId) {
            request.session.warning = 'You are already the project lead.';
            return response.redirect(`/projects/${projectId}`);
        }

        return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
            .then(([membershipRows]) => {
                if (membershipRows.length > 0) {
                    request.session.warning = 'You are already a member of this project.';
                    return response.redirect(`/projects/${projectId}`);
                }

                return Collaboration.joinProject(projectId, employeeId).then(() => {
                    request.session.success = `You joined ${projectRows[0].name || 'the project'}.`;
                    return response.redirect(`/projects/${projectId}`);
                });
            });
    }).catch((error) => {
        console.log(error);
        request.session.error = 'We could not update the project membership right now.';
        return response.redirect(`/projects/${projectId}`);
    });
};

exports.leaveProject = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';

    Project.findById(projectId).then(([projectRows]) => {
        if (!projectRows.length) {
            request.session.error = 'The selected project was not found.';
            return response.redirect('/projects');
        }

        if (projectRows[0].employee_responsible_id === employeeId) {
            request.session.warning = 'The project lead cannot leave the project.';
            return response.redirect(`/projects/${projectId}`);
        }

        return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
            .then(([membershipRows]) => {
                if (!membershipRows.length) {
                    request.session.warning = 'You are not currently a member of this project.';
                    return response.redirect(`/projects/${projectId}`);
                }

                return Collaboration.leaveProject(projectId, employeeId).then(() => {
                    request.session.success = `You left ${projectRows[0].name || 'the project'}.`;
                    return response.redirect(`/projects/${projectId}`);
                });
            });
    }).catch((error) => {
        console.log(error);
        request.session.error = 'We could not update the project membership right now.';
        return response.redirect(`/projects/${projectId}`);
    });
};

exports.toggleProjectMembership = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';

    Project.findById(projectId)
        .then(([projectRows]) => {
            if (!projectRows.length) {
                return response.redirect('/projects');
            }

            if (projectRows[0].employee_responsible_id === employeeId) {
                return response.redirect(`/projects/${projectId}`);
            }

            return Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
                .then(([membershipRows]) => {
                    if (membershipRows.length > 0) {
                        return Collaboration.leaveProject(projectId, employeeId);
                    }

                    return Collaboration.joinProject(projectId, employeeId);
                })
                .then(() => {
                    return response.redirect(`/projects/${projectId}`);
                });
        })
        .catch((error) => {
            console.log(error);
            return response.redirect(`/projects/${projectId}`);
        });
};

exports.searchProjects = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';

    return Promise.all([
        Project.searchDirectory(employeeId, query),
        Project.getDirectorySuggestions(employeeId, query),
    ]).then(([
        [directoryProjects],
        [suggestionProjects],
    ]) => {
        const myProjects = [];
        const otherProjects = [];
        const suggestions = suggestionProjects.map((project) => ({
            id: project.project_id,
            name: project.name,
            leadName: project.lead_name || 'Pending assignment',
            isMember: Boolean(project.is_member || project.isMember),
        }));

        directoryProjects.forEach((project) => {
            const normalizedProject = {
                id: project.project_id,
                name: project.name,
                leadName: project.lead_name || 'Pending assignment',
                description: project.description,
                image: project.image || null,
                isMember: Boolean(project.is_member || project.isMember),
            };

            if (normalizedProject.isMember) {
                myProjects.push(normalizedProject);
                return;
            }

            otherProjects.push(normalizedProject);
        });

        return response.render('partials/projectDirectory/projectDirectoryResults', {
            layout: false,
            myProjects,
            otherProjects,
        }, (renderError, resultsHtml) => {
            if (renderError) {
                console.log(renderError);
                return response.status(500).json({
                    error: 'Unable to search projects right now.',
                });
            }

            return response.json({
                query,
                resultsHtml,
                suggestions,
                totalProjects: directoryProjects.length,
            });
        });
    }).catch((error) => {
        console.log(error);
        return response.status(500).json({
            error: 'Unable to search projects right now.',
        });
    });
};

/*updateProjectInfo
Function responsible for updating project information from the "Edit Project Information" popup.*/

exports.updateProjectInfo = (request, response, next) => {
    const projectId = request.params.project_id;
    const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const status = typeof request.body.status === 'string' ? request.body.status.trim() : '';
    const startDate = typeof request.body.startDate === 'string' ? request.body.startDate.trim() : '';
    const endDate = typeof request.body.endDate === 'string' ? request.body.endDate.trim() : '';

    if (!name) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Project name is required.',
        });
    }

    if (!PROJECT_ALLOWED_STATUS.includes(status)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Select a valid project status.',
        });
    }

    if (!isValidDateInput(startDate) || !isValidDateInput(endDate)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Provide valid project dates.',
        });
    }

    if (startDate && endDate && startDate > endDate) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'The project end date cannot be before the start date.',
        });
    }

    return Project.update(
        projectId,
        name,
        description || null,
        status,
        startDate || null,
        endDate || null,
    )
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected project was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not update project information right now.',
            });
        });
};

/*createGoal
Function responsible for creating a goal from the "Add Goal" popup.*/

exports.createGoal = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const status = typeof request.body.status === 'string' ? request.body.status.trim() : '';
    const dueDate = typeof request.body.dueDate === 'string' ? request.body.dueDate.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Goal title is required.',
        });
    }

    if (!GOAL_ALLOWED_STATUS.includes(status)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Select a valid goal status.',
        });
    }

    if (!isValidDateInput(dueDate)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Provide a valid due date.',
        });
    }

    return Goal.create(
        projectId,
        employeeId,
        title,
        description || '',
        dueDate || null,
        status,
    )
        .then(() => respondProjectPopupRequest(request, response, projectId, 200, {
            success: true,
        }))
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not create goal right now.',
            });
        });
};

/*updateGoal
Function responsible for updating a goal from the "Edit Goal" popup.*/

exports.updateGoal = (request, response, next) => {
    const projectId = request.params.project_id;
    const goalId = request.params.goal_id;
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const status = typeof request.body.status === 'string' ? request.body.status.trim() : '';
    const dueDate = typeof request.body.dueDate === 'string' ? request.body.dueDate.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Goal title is required.',
        });
    }

    if (!GOAL_ALLOWED_STATUS.includes(status)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Select a valid goal status.',
        });
    }

    if (!isValidDateInput(dueDate)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Provide a valid due date.',
        });
    }

    return Goal.update(goalId, projectId, title, description || '', dueDate || null, status)
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected goal was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not update goal right now.',
            });
        });
};

/*deleteGoal
Function responsible for deleting a goal from the "Delete Goal" popup.*/

exports.deleteGoal = (request, response, next) => {
    const projectId = request.params.project_id;
    const goalId = request.params.goal_id;

    return Goal.delete(goalId, projectId)
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected goal was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not delete goal right now.',
            });
        });
};

/*createAchievement
Function responsible for creating an achievement from the "Add Achievement" popup.*/

exports.createAchievement = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const achievementDate = typeof request.body.achievementDate === 'string' ? request.body.achievementDate.trim() : '';
    const evidenceLink = typeof request.body.evidenceLink === 'string' ? request.body.evidenceLink.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Achievement title is required.',
        });
    }

    if (!achievementDate || !isValidDateInput(achievementDate)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Provide a valid achievement date.',
        });
    }

    return Achievement.create(
        projectId,
        employeeId,
        title,
        description || '',
        achievementDate,
        evidenceLink || null,
    )
        .then(() => respondProjectPopupRequest(request, response, projectId, 200, {
            success: true,
        }))
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not create achievement right now.',
            });
        });
};

/*updateAchievement
Function responsible for updating an achievement from the "Edit Achievement" popup.*/

exports.updateAchievement = (request, response, next) => {
    const projectId = request.params.project_id;
    const achievementId = request.params.achievement_id;
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const description = typeof request.body.description === 'string' ? request.body.description.trim() : '';
    const achievementDate = typeof request.body.achievementDate === 'string' ? request.body.achievementDate.trim() : '';
    const evidenceLink = typeof request.body.evidenceLink === 'string' ? request.body.evidenceLink.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Achievement title is required.',
        });
    }

    if (!achievementDate || !isValidDateInput(achievementDate)) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Provide a valid achievement date.',
        });
    }

    return Achievement.update(
        achievementId,
        projectId,
        title,
        description || '',
        achievementDate,
        evidenceLink || null,
    )
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected achievement was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not update achievement right now.',
            });
        });
};

/*deleteAchievement
Function responsible for deleting an achievement from the "Delete Achievement" popup.*/

exports.deleteAchievement = (request, response, next) => {
    const projectId = request.params.project_id;
    const achievementId = request.params.achievement_id;

    return Achievement.delete(achievementId, projectId)
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected achievement was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not delete achievement right now.',
            });
        });
};

/*createHighlight
Function responsible for creating a highlight from the "Add Highlight" popup.*/

exports.createHighlight = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const content = typeof request.body.content === 'string' ? request.body.content.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Highlight title is required.',
        });
    }

    if (!content) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Highlight content is required.',
        });
    }

    return Highlight.create(employeeId, projectId, title, content)
        .then(() => respondProjectPopupRequest(request, response, projectId, 200, {
            success: true,
        }))
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not create highlight right now.',
            });
        });
};

/*updateHighlight
Function responsible for updating a highlight from the "Edit Highlight" popup.*/

exports.updateHighlight = (request, response, next) => {
    const projectId = request.params.project_id;
    const highlightId = request.params.highlight_id;
    const title = typeof request.body.title === 'string' ? request.body.title.trim() : '';
    const content = typeof request.body.content === 'string' ? request.body.content.trim() : '';

    if (!title) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Highlight title is required.',
        });
    }

    if (!content) {
        return respondProjectPopupRequest(request, response, projectId, 400, {
            error: 'Highlight content is required.',
        });
    }

    return Highlight.update(highlightId, projectId, title, content)
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected highlight was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not update highlight right now.',
            });
        });
};

/*deleteProject
Function responsible for disabling a project from the delete project popup.*/

exports.deleteProject = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const acceptHeader = request.get('Accept') || '';
    const respondDeleteProject = function respondDeleteProject(statusCode, payload, redirectTo = '/projects') {
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

    return Project.findById(projectId)
        .then(([projectRows]) => {
            const project = projectRows[0];

            if (!project) {
                return respondDeleteProject(404, {
                    success: false,
                    error: 'Project not found.',
                });
            }

            if (project.employee_responsible_id !== employeeId) {
                return respondDeleteProject(403, {
                    success: false,
                    error: 'Only the project lead can delete this project.',
                }, `/projects/${projectId}`);
            }

            return Project.disableProject(projectId)
                .then(([result]) => {
                    if (!result.affectedRows) {
                        return respondDeleteProject(500, {
                            success: false,
                            error: 'The project could not be deleted right now.',
                        }, `/projects/${projectId}`);
                    }

                    return respondDeleteProject(200, {
                        success: true,
                        successMessage: 'Project deleted successfully.',
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return respondDeleteProject(500, {
                success: false,
                error: 'The project could not be deleted right now.',
            });
        });
};

/*deleteHighlight
Function responsible for deleting a highlight from the "Delete Highlight" popup.*/

exports.deleteHighlight = (request, response, next) => {
    const projectId = request.params.project_id;
    const highlightId = request.params.highlight_id;

    return Highlight.delete(highlightId, projectId)
        .then(([result]) => {
            if (!result.affectedRows) {
                return respondProjectPopupRequest(request, response, projectId, 404, {
                    error: 'The selected highlight was not found.',
                });
            }

            return respondProjectPopupRequest(request, response, projectId, 200, {
                success: true,
            });
        })
        .catch((error) => {
            console.log(error);
            return respondProjectPopupRequest(request, response, projectId, 500, {
                error: 'Could not delete highlight right now.',
            });
        });
};
