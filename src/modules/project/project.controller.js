/*
Title: project.controller.js
Last modification: March 26,2026
Modified by: OpenAI
*/

const Project = require('../../models/project');
const Goal = require('../../models/goal');
const Achievement = require('../../models/achievement');
const Highlight = require('../../models/highlight');
const Activity = require('../../models/activity');
const Collaboration = require('../../models/collaboration');
const ProjectTeam = require('../../models/projectTeamAssignment');

const PAGE_TITLE = 'Project';
const PAGE_SUBTITLE = 'Intermediate selection for own and other projects.';
const PROJECT_CREATE_PAGE_TITLE = 'New Project';
const PROJECT_CREATE_PAGE_SUBTITLE = 'Register a new project and assign yourself as the responsible lead.';
const PROJECT_CREATE_DUPLICATE_MESSAGE = 'A project with that name already exists.';
const PROJECT_CREATE_GENERIC_ERROR_MESSAGE = 'The project could not be created right now.';

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

const resolveActivityFilter = function resolveActivityFilter(query = {}) {
    const preset = typeof query.activityPreset === 'string' ? query.activityPreset.trim() : '';
    const startDate = typeof query.startDate === 'string' ? query.startDate.trim() : '';
    const endDate = typeof query.endDate === 'string' ? query.endDate.trim() : '';
    const today = new Date();

    if (preset === 'today' || preset === '3days' || preset === '5days') {
        const days = preset === 'today' ? 1 : preset === '3days' ? 3 : 5;
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

    return {
        preset: '',
        startDate,
        endDate,
        hasManualRange: Boolean(startDate || endDate),
        isFiltered: Boolean(startDate || endDate),
        rangeStart: startDate ? new Date(`${startDate}T00:00:00`) : null,
        rangeEnd: endDate ? new Date(`${endDate}T23:59:59.999`) : null,
    };
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
    const activityFilter = resolveActivityFilter(request.query);
    const activityPromise = activityFilter.isFiltered
        ? Activity.fetchByProjectBetween(projectId, activityFilter.rangeStart, activityFilter.rangeEnd)
        : Activity.fetchByProject(projectId);

    Promise.all([
        Project.findById(projectId),
        Achievement.fetchByProject(projectId),
        Highlight.fetchByProject(projectId),
        activityPromise,
        ProjectTeam.fetchDetailedByProject(projectId),
        Collaboration.fetchDetailedByProject(projectId),
        Collaboration.findActiveByProjectAndEmployee(projectId, employeeId),
    ]).then(([
        [projectRows],
        [achievementRows],
        [highlightRows],
        [activityRows],
        [teamRows],
        [memberRows],
        [activeCollaborationRows],
    ]) => {
        if (!projectRows || projectRows.length === 0) {
            return response.status(404).render('pages/project', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                error: 'Project not found',
                project: {
                    id: null,
                    name: 'Project not found',
                    description: 'No project information is available for the selected project.',
                    achievementsDetailed: [],
                    highlightsDetailed: [],
                    teamsDetailed: [],
                    membersDetailed: [],
                    lead: {
                        fullName: 'Unknown',
                    },
                },
                projectName: 'Project not found',
                projectDescription: 'No project information is available for the selected project.',
                projectMembership: {
                    isMember: false,
                    canToggle: false,
                    buttonLabel: 'Join Project',
                },
                activitySections: [],
                activityFilter,
            });
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

        return response.render('pages/project', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            error: '',
            project: {
                ...project,
                id: project.project_id,
                name: project.name || 'Project',
                description: project.description || 'No project description has been added yet.',
                status: project.status || 'Unknown',
                startDateLabel: formatDateLabel(project.start_date, 'N/A'),
                endDateLabel: formatDateLabel(project.end_date, 'In progress'),
                lead: {
                    fullName: project.lead_name || 'Unknown',
                },
                achievementsDetailed: achievementRows.map((achievement) => ({
                    id: achievement.achievement_id || null,
                    title: achievement.title || 'Untitled achievement',
                    description: achievement.description || 'No achievement description available.',
                    authorName: achievement.full_name || 'Unknown',
                    achievementDateLabel: formatDateLabel(achievement.achievement_date, 'Date unavailable'),
                    evidenceLink: achievement.evidence_link || '',
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
                    role: team.team_role || 'CONTRIBUTOR',
                    joinedAtLabel: formatDateLabel(team.joined_at, 'Date unavailable'),
                })),
                membersDetailed: memberRows.map((member) => ({
                    id: member.employee_id || null,
                    fullName: member.full_name || 'Unknown',
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
            currentEmployeeId: employeeId,
        });
    }).catch((error) => {
        console.log(error);
        next(error);
    });
};

exports.toggleProjectMembership = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';

    Collaboration.findActiveByProjectAndEmployee(projectId, employeeId)
        .then(([membershipRows]) => {
            if (membershipRows.length > 0) {
                return Collaboration.leaveProject(projectId, employeeId);
            }

            return Collaboration.joinProject(projectId, employeeId);
        })
        .then(() => {
            return response.redirect(`/projects/${projectId}`);
        })
        .catch((error) => {
            console.log(error);
            return response.redirect(`/projects/${projectId}`);
        });
};

exports.searchProjects = (request, response, next) => {
    return response.json({
        query: '',
        resultsHtml: '',
        suggestions: '',
        totalTeams: '',
    });
};

/*deleteGoal
AJAX function responsible for handling the goal deletion.*/

exports.deleteGoal = (request, response, next) => {
    Goal.delete(request.params.goal_id).then(() => {
        return response.status(200).json({ success: true });
    })
    .catch((error) => {
        console.log(error);
        return response.status(500).json({ success: false, message: error.stack });
    });
};
