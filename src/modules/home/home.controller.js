const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');
const Goal = require('../../models/goal');
const Achievement = require('../../models/achievement');
const Highlight = require('../../models/highlight');
const { getInitials, resolveAvatarImage } = require('../../utils/avatar.util');

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
            content: activity.description || '',
            authorName,
            authorInitials: getInitials(authorName, '?'),
            activityTimeLabel: rawDate
                ? new Date(rawDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                })
                : '',
            completedAt: rawDate || '',
        });

        grouped.set(key, items);
    });

    return [...grouped.entries()]
        .sort((leftSection, rightSection) => (leftSection[0] < rightSection[0] ? 1 : -1))
        .map(([key, items]) => ({
            dayLabel: key === 'unknown' ? 'Unknown date' : formatDayLabel(key),
            items,
        }));
};

const buildEmployeeActivityProjects = function buildEmployeeActivityProjects(activities) {
    const grouped = new Map();

    activities.forEach((activity) => {
        const projectId = activity.project_id || 'unassigned';
        const projectName = activity.project_name || 'General Activity';
        const projectKey = `${projectId}:${projectName}`;
        const rawDate = activity.completed_at;
        const projectActivities = grouped.get(projectKey) || {
            id: activity.project_id || '',
            name: projectName,
            latestCompletedAt: rawDate || null,
            items: [],
        };

        if (rawDate && (!projectActivities.latestCompletedAt || rawDate > projectActivities.latestCompletedAt)) {
            projectActivities.latestCompletedAt = rawDate;
        }

        projectActivities.items.push({
            id: activity.activity_id || '',
            projectId: activity.project_id || '',
            title: activity.title || 'Untitled activity',
            description: activity.description || '',
            dateLabel: rawDate ? formatDayLabel(rawDate) : 'Unknown date',
            timeLabel: rawDate
                ? new Date(rawDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                })
                : '',
        });

        grouped.set(projectKey, projectActivities);
    });

    return [...grouped.values()]
        .sort((leftProject, rightProject) => {
            const leftDate = leftProject.latestCompletedAt || '';
            const rightDate = rightProject.latestCompletedAt || '';

            if (leftDate < rightDate) {
                return 1;
            }

            if (leftDate > rightDate) {
                return -1;
            }

            return 0;
        });
};

const buildHomeTeamActivityGroups = function buildHomeTeamActivityGroups(teams, teamActivityRowsByTeam) {
    return teams.map((team, index) => ({
        id: team.team_id,
        name: team.name || 'Unnamed team',
        sections: buildActivitySections((teamActivityRowsByTeam[index] || []).slice(0, 10)),
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

exports.getHome = async (request, response, next) => {
    const sessionUser = request.session.user || {};
    const userId = sessionUser.id;
    const employeeId = sessionUser.employeeId;
    const wantsActivityPartial = (request.get('Accept') || '').includes('application/json')
        && request.query.ajax === 'activity';
    const selectedActivityProjectId = typeof request.query.projectId === 'string'
        ? request.query.projectId.trim()
        : '';

    try {
        const activityFilter = resolveActivityFilter(request.query);
        const [
            [userProjects],
            [otherProjects],
            [accountRows],
            [employeeRows],
            [activityRows],
            [teamRows],
            [employeeProjectRows],
        ] = await Promise.all([
            employeeId ? Project.fetchByEmployeeId(employeeId) : Promise.resolve([[]]),
            employeeId ? Project.fetchNotByEmployeeId(employeeId) : Promise.resolve([[]]),
            userId ? Account.fetchById(userId) : Promise.resolve([[]]),
            employeeId ? Employee.getNamesByEmployeeId(employeeId) : Promise.resolve([[]]),
            activityFilter.error || !employeeId
                ? Promise.resolve([[]])
                : Activity.fetchByEmployee(employeeId, activityFilter.rangeStart, activityFilter.rangeEnd),
            employeeId ? Team.fetchByEmployeeId(employeeId) : Promise.resolve([[]]),
            employeeId ? Project.getProjectByEmployeeId(employeeId) : Promise.resolve([[]]),
        ]);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        const accountInfo = accountRows[0] || {};
        const employeeInfo = employeeRows[0] || {};
        const filteredActivities = selectedActivityProjectId
            ? activityRows.filter((activity) => {
                return String(activity.project_id || '') === selectedActivityProjectId;
            })
            : activityRows;
        // Home renders the personal timeline grouped by day while the filter still works by project.
        const latestActivitySections = buildActivitySections(filteredActivities);
        const projectRows = employeeProjectRows.map((project) => ({
            project: {
                id: project.project_id,
                name: project.name,
            },
            roleName: project.coll_role || 'MEMBER',
            startDateLabel: formatDayLabel(project.started_at),
        }));
        const activityProjects = buildEmployeeActivityProjects(filteredActivities);
        const teamActivityRowsByTeam = await Promise.all(
            teamRows.map(async (team) => {
                const [rows] = await Activity.getTeamMembersActivities(
                    team.team_id,
                    activityFilter.isFiltered ? activityFilter.rangeStart : null,
                    activityFilter.isFiltered ? activityFilter.rangeEnd : null,
                );

                return rows;
            }),
        );
        const teamActivityGroups = buildHomeTeamActivityGroups(teamRows, teamActivityRowsByTeam);
        const projectPanels = await Promise.all(userProjects.map(async (project) => {
            const [goalRows] = await Goal.fetchByProject(project.project_id);
            const [achievementRows] = await Achievement.fetchByProject(project.project_id);
            const [highlightRows] = await Highlight.fetchByProject(project.project_id);
            const goals = goalRows.map((goal) => ({
                title: goal.title || 'Untitled goal',
                description: goal.description || '',
                dueDate: goal.due_date || null,
                status: goal.status || 'UNKNOWN',
            }));
            const achievements = achievementRows.map((achievement) => ({
                title: achievement.title || 'Untitled achievement',
                description: achievement.description || '',
                achievementDate: achievement.achievement_date || null,
            }));
            const highlights = highlightRows.map((highlight) => ({
                title: highlight.title || 'Untitled highlight',
                content: highlight.content || '',
                createdAt: highlight.created_at || null,
            }));
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
            const latestKeyInformationItems = [
                ...goals.map((goal) => ({
                    type: 'Goal',
                    title: goal.title,
                    body: goal.description,
                    dateValue: goal.dueDate || null,
                    dateLabel: goal.dueDate ? formatDayLabel(goal.dueDate) : 'No due date',
                    tone: 'border-amber-200 bg-amber-50 text-amber-700',
                })),
                ...achievements.map((achievement) => ({
                    type: 'Achievement',
                    title: achievement.title,
                    body: achievement.description,
                    dateValue: achievement.achievementDate || null,
                    dateLabel: achievement.achievementDate ? formatDayLabel(achievement.achievementDate) : 'No date',
                    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
                })),
                ...highlights.map((highlight) => ({
                    type: 'Highlight',
                    title: highlight.title,
                    body: highlight.content,
                    dateValue: highlight.createdAt || null,
                    dateLabel: highlight.createdAt ? formatDayLabel(highlight.createdAt) : 'No date',
                    tone: 'border-sky-200 bg-sky-50 text-sky-700',
                })),
            ]
                .sort((leftItem, rightItem) => {
                    return new Date(rightItem.dateValue || 0) - new Date(leftItem.dateValue || 0);
                })
                .slice(0, 3);

            return {
                id: project.project_id,
                name: project.name || 'Unnamed project',
                description: project.description || '',
                projectStatus,
                priorityLabel,
                priorityTone,
                statusTone,
                goalsCount: goals.length,
                achievementsCount: achievements.length,
                highlightsCount: highlights.length,
                latestKeyInformationItems,
                startDate: project.start_date || null,
            };
        }));
        const displayName = employeeInfo.names || sessionUser.username || 'Usuario';

        if (wantsActivityPartial) {
            return response.render('partials/HOME/latestActivity', {
                layout: false,
                latestActivitySections,
                activityProjects,
                projectRows,
                selectedActivityProjectId,
                activityFilter,
                activityError: activityFilter.error || '',
            }, (renderError, html) => {
                if (renderError) {
                    console.log(renderError);
                    return response.status(500).json({
                        error: 'The activity log could not be loaded. Please try again.',
                    });
                }

                const nextUrl = new URL('/home', `${request.protocol}://${request.get('host')}`);

                if (activityFilter?.preset) {
                    nextUrl.searchParams.set('activityPreset', activityFilter.preset);
                }

                if (selectedActivityProjectId) {
                    nextUrl.searchParams.set('projectId', selectedActivityProjectId);
                }

                return response.json({
                    html,
                    url: `${nextUrl.pathname}${nextUrl.search}`,
                });
            });
        }

        return response.render('pages/home', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Home',
            path: '/home',
            user: sessionUser,
            reportSubjects: {
                employees: employeeId
                    ? [
                        {
                            id: employeeId,
                            name: displayName,
                            label: displayName,
                        },
                    ]
                    : [],
                teams: teamRows.map((team) => ({
                    id: team.team_id,
                    name: team.name,
                    label: team.name,
                })),
                projects: allVisibleProjects.map((project) => ({
                    id: project.project_id,
                    name: project.name,
                    label: project.name,
                })),
            },
            myProjects: userProjects,
            latestReports: {},
            activityProjects,
            latestActivitySections,
            projectRows,
            selectedActivityProjectId,
            activityFilter,
            activityError: activityFilter.error || '',
            teamActivityGroups,
            projectPanels,
            account: {
                image: resolveAvatarImage(accountInfo.image),
            },
            employee: {
                names: displayName,
            },
        });
    } catch (error) {
        console.log('Error en Home Controller:', error);
        next(error);
    }
};
