/*
Title: project.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
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
const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});
const TIME_LABEL_FORMATTER = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
});
const ACTIVITY_PRESET_WINDOWS = {
    today: 1,
    '3days': 3,
    '5days': 5,
};

const parseDateInput = function parseDateInput(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsedDate = new Date(year, month - 1, day);

    if (
        parsedDate.getFullYear() !== year
        || parsedDate.getMonth() !== month - 1
        || parsedDate.getDate() !== day
    ) {
        return null;
    }

    return parsedDate;
};

const normalizeDate = function normalizeDate(value) {
    if (!value) {
        return null;
    }

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'string') {
        const trimmedValue = value.trim();
        const parsedDateInput = parseDateInput(trimmedValue);

        if (parsedDateInput) {
            return parsedDateInput;
        }

        const parsedDateTime = new Date(trimmedValue.replace(' ', 'T'));
        return Number.isNaN(parsedDateTime.getTime()) ? null : parsedDateTime;
    }

    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const toDateInputValue = function toDateInputValue(value) {
    const normalizedValue = normalizeDate(value);

    if (!normalizedValue) {
        return '';
    }

    const year = normalizedValue.getFullYear();
    const month = String(normalizedValue.getMonth() + 1).padStart(2, '0');
    const day = String(normalizedValue.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const startOfDay = function startOfDay(dateValue) {
    const normalizedValue = normalizeDate(dateValue);
    if (!normalizedValue) {
        return null;
    }

    const date = new Date(normalizedValue);
    date.setHours(0, 0, 0, 0);
    return date;
};

const endOfDay = function endOfDay(dateValue) {
    const normalizedValue = normalizeDate(dateValue);
    if (!normalizedValue) {
        return null;
    }

    const date = new Date(normalizedValue);
    date.setHours(23, 59, 59, 999);
    return date;
};

const formatDateLabel = function formatDateLabel(value, fallback = '') {
    const normalizedValue = normalizeDate(value);
    return normalizedValue ? DATE_LABEL_FORMATTER.format(normalizedValue) : fallback;
};

const resolveActivityFilter = function resolveActivityFilter(query = {}) {
    const presetCandidate = typeof query.activityPreset === 'string'
        ? query.activityPreset.trim()
        : '';
    const preset = Object.prototype.hasOwnProperty.call(ACTIVITY_PRESET_WINDOWS, presetCandidate)
        ? presetCandidate
        : '';

    if (preset) {
        const today = new Date();
        const rangeEnd = endOfDay(today);
        const rangeStart = startOfDay(today);
        rangeStart.setDate(rangeStart.getDate() - (ACTIVITY_PRESET_WINDOWS[preset] - 1));

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

    const startDate = typeof query.startDate === 'string' ? query.startDate.trim() : '';
    const endDate = typeof query.endDate === 'string' ? query.endDate.trim() : '';
    const parsedStartDate = parseDateInput(startDate);
    const parsedEndDate = parseDateInput(endDate);
    const rangeStart = parsedStartDate ? startOfDay(parsedStartDate) : null;
    const rangeEnd = parsedEndDate ? endOfDay(parsedEndDate) : null;
    const hasManualRange = Boolean(startDate || endDate);

    if (rangeStart && rangeEnd && rangeStart > rangeEnd) {
        return {
            preset: '',
            startDate,
            endDate,
            hasManualRange,
            isFiltered: false,
            rangeStart: null,
            rangeEnd: null,
        };
    }

    return {
        preset: '',
        startDate,
        endDate,
        hasManualRange,
        isFiltered: Boolean(rangeStart || rangeEnd),
        rangeStart,
        rangeEnd,
    };
};

const normalizeProject = function normalizeProject(project) {
    return {
        id: project.project_id ?? null,
        name: project.name ?? 'Unnamed project',
        leadName: project.full_name || project.lead_name || 'Pending assignment',
        description: project.description ?? 'No project description has been added yet.',
        image: project.image ?? null,
        isMember: Boolean(project.isMember ?? project.is_member),
        status: project.status ?? '',
        startDate: project.start_date ?? '',
        endDate: project.end_date ?? '',
    };
};

const normalizeHighlight = function normalizeHighlight(highlight) {
    return {
        id: highlight.highlight_id ?? null,
        title: highlight.title ?? 'Untitled highlight',
        content: highlight.content ?? 'No highlight content available.',
        authorName: highlight.full_name ?? 'Unknown',
        createdAtLabel: formatDateLabel(highlight.created_at, 'Date unavailable'),
    };
};

const normalizeAchievement = function normalizeAchievement(achievement) {
    return {
        id: achievement.achievement_id ?? null,
        title: achievement.title ?? 'Untitled achievement',
        description: achievement.description ?? 'No achievement description available.',
        authorName: achievement.full_name ?? 'Unknown',
        achievementDateLabel: formatDateLabel(
            achievement.achievement_date,
            'Date unavailable',
        ),
        evidenceLink: achievement.evidence_link ?? '',
    };
};

const normalizeProjectTeam = function normalizeProjectTeam(team) {
    return {
        id: team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        description: team.description ?? 'No team description available.',
        image: team.image ?? null,
        status: team.status ?? 'Unknown',
        role: team.team_role ?? 'CONTRIBUTOR',
        joinedAtLabel: formatDateLabel(team.joined_at, 'Date unavailable'),
    };
};

const normalizeProjectMember = function normalizeProjectMember(member) {
    return {
        id: member.employee_id ?? null,
        fullName: member.full_name ?? 'Unknown',
        description: member.description ?? 'Active collaborator',
        startedAtLabel: formatDateLabel(member.started_at, 'Date unavailable'),
    };
};

const normalizeActivity = function normalizeActivity(activity) {
    const completedAt = normalizeDate(activity.completed_at);
    const authorName = activity.full_name ?? 'Unknown';

    return {
        id: activity.activity_id ?? null,
        title: activity.title ?? 'Untitled activity',
        description: activity.description ?? '',
        authorName,
        authorInitials: authorName
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('') || '?',
        completedAt,
        dayLabel: completedAt ? DATE_LABEL_FORMATTER.format(completedAt) : 'Unknown date',
        activityTimeLabel: completedAt ? TIME_LABEL_FORMATTER.format(completedAt) : '',
    };
};

const buildActivitySections = function buildActivitySections(activities) {
    const sectionMap = new Map();

    for (const activity of activities) {
        const dayKey = activity.dayLabel ?? 'Unknown date';

        if (!sectionMap.has(dayKey)) {
            sectionMap.set(dayKey, []);
        }

        sectionMap.get(dayKey).push({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            authorName: activity.authorName,
            authorInitials: activity.authorInitials,
            activityTimeLabel: activity.activityTimeLabel,
        });
    }

    return Array.from(sectionMap.entries()).map(([dayLabel, items]) => ({
        dayLabel,
        items,
    }));
};

const buildProjectMembership = function buildProjectMembership(project, employeeId, activeCollaborationRows) {
    const isLead = project.employee_responsible_id === employeeId;
    const hasDirectMembership = activeCollaborationRows.length > 0;

    if (isLead) {
        return {
            isMember: true,
            canToggle: false,
            buttonLabel: 'Project Lead',
        };
    }

    if (hasDirectMembership) {
        return {
            isMember: true,
            canToggle: true,
            buttonLabel: 'Leave Project',
        };
    }

    return {
        isMember: false,
        canToggle: true,
        buttonLabel: 'Join Project',
    };
};

exports.getProjects = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    Project.fetchByEmployeeId(employeeId).then(([projects, fieldData])=>{
        Project.fetchNotByEmployeeId(employeeId).then(([notProjects, fieldData])=>{
            return response.render('pages/projectDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: PAGE_TITLE,
                pageSubtitle: PAGE_SUBTITLE,
                myProjects: projects.map((project) => normalizeProject(project)),
                otherProjects: notProjects.map((project) => normalizeProject(project)),
                query: '',
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
    });
};

exports.getProjectPage = (request, response, next) => {
    const projectId = request.params.project_id;
    const employeeId = request.session.employeeId || '';
    const activityFilter = resolveActivityFilter(request.query);
    const activityPromise = activityFilter.isFiltered
        ? Activity.fetchByProjectBetween(
            projectId,
            activityFilter.rangeStart,
            activityFilter.rangeEnd,
        )
        : Activity.fetchByProject(projectId);

    Promise.all([
        Project.findById(projectId),
        Achievement.fetchByProject(projectId),
        Highlight.fetchByProject(projectId),
        activityPromise,
        ProjectTeam.fetchDetailedByProject(projectId),
        Collaboration.fetchDetailedByProject(projectId),
        Collaboration.findActiveByProjectAndEmployee(projectId, employeeId),
    ])
        .then(([
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
                    csrfToken: request.csrfToken(),
                    isLoggedIn: request.session.isLoggedIn || '',
                    username: request.session.username || '',
                });
            }

            const project = projectRows[0];
            const projectMembership = buildProjectMembership(
                project,
                employeeId,
                activeCollaborationRows,
            );
            const normalizedActivities = activityRows.map((activity) => normalizeActivity(activity));
            const normalizedProject = {
                ...project,
                id: project.project_id,
                name: project.name ?? 'Project',
                description: project.description ?? 'No project description has been added yet.',
                status: project.status ?? 'Unknown',
                startDateLabel: formatDateLabel(project.start_date, 'N/A'),
                endDateLabel: formatDateLabel(project.end_date, 'In progress'),
                lead: {
                    fullName: project.lead_name ?? 'Unknown',
                },
                achievementsDetailed: achievementRows.map((achievement) => normalizeAchievement(achievement)),
                highlightsDetailed: highlightRows.map((highlight) => normalizeHighlight(highlight)),
                teamsDetailed: teamRows.map((team) => normalizeProjectTeam(team)),
                membersDetailed: memberRows.map((member) => normalizeProjectMember(member)),
            };

            if (process.env.NODE_ENV !== 'production') {
                console.log('[project-detail]', {
                    projectId,
                    projectName: normalizedProject.name,
                    achievements: normalizedProject.achievementsDetailed.length,
                    highlights: normalizedProject.highlightsDetailed.length,
                    teams: normalizedProject.teamsDetailed.length,
                    members: normalizedProject.membersDetailed.length,
                    activitySections: buildActivitySections(normalizedActivities).length,
                    activityItems: normalizedActivities.length,
                });
            }

            return response.render('pages/project', {
                project: normalizedProject,
                error: '',
                projectName: normalizedProject.name,
                projectDescription: normalizedProject.description,
                projectMembership,
                activitySections: buildActivitySections(normalizedActivities),
                activityFilter: {
                    preset: activityFilter.preset,
                    startDate: activityFilter.startDate,
                    endDate: activityFilter.endDate,
                    hasManualRange: activityFilter.hasManualRange,
                    isFiltered: activityFilter.isFiltered,
                },
                currentEmployeeId: employeeId,
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
            });
        })
        .catch((error) => {
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

// (Removed unused getProject function)

/*deleteGoal
AJAX function responsible for handling the goal deletion.*/

exports.deleteGoal = (request, response, next)=>{
    Goal.delete(request.params.goal_id).then(()=>{
        return response.status(200).json({success:true});
    })
    .catch((error)=>{
        console.log(error);
        return response.status(500).json({success:false, message: error.stack});
    })
};
