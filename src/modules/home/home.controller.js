const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');
const Goal = require('../../models/goal');
const Achievement = require('../../models/achievement');
const Highlight = require('../../models/highlight');

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
            authorInitials: authorName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
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

exports.getHome = async (request, response, next) => {
    const sessionUser = request.session.user || {};
    const userId = sessionUser.id;
    const employeeId = sessionUser.employeeId;

    try {
        const [
            [userProjects],
            [otherProjects],
            [accountRows],
            [employeeRows],
            [activityRows],
            [teamRows],
        ] = await Promise.all([
            employeeId ? Project.fetchByEmployeeId(employeeId) : Promise.resolve([[]]),
            employeeId ? Project.fetchNotByEmployeeId(employeeId) : Promise.resolve([[]]),
            userId ? Account.fetchById(userId) : Promise.resolve([[]]),
            employeeId ? Employee.getNamesByEmployeeId(employeeId) : Promise.resolve([[]]),
            employeeId ? Activity.fetchByEmployee(employeeId) : Promise.resolve([[]]),
            employeeId ? Team.fetchByEmployeeId(employeeId) : Promise.resolve([[]]),
        ]);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        const accountInfo = accountRows[0] || {};
        const employeeInfo = employeeRows[0] || {};
        // Home only needs a short recent feed, not the full employee activity history.
        const latestActivitySections = buildActivitySections(activityRows.slice(0, 6));
        // Home keeps a single team feed to avoid mixing separate team timelines in one card.
        const primaryTeam = teamRows[0] || null;
        const [teamActivityRows] = primaryTeam
            ? await Activity.getTeamMembersActivities(primaryTeam.team_id)
            : [[]];
        const teamActivitySections = buildActivitySections(teamActivityRows.slice(0, 10));
        const projectPanels = await Promise.all(userProjects.map(async (project) => {
            const [goalRows] = await Goal.fetchByProject(project.project_id);
            const [achievementRows] = await Achievement.fetchByProject(project.project_id);
            const [highlightRows] = await Highlight.fetchByProject(project.project_id);

            return {
                id: project.project_id,
                name: project.name || 'Unnamed project',
                status: project.status || 'Unknown',
                startDate: project.start_date || null,
                description: project.description || '',
                goals: goalRows.map((goal) => ({
                    title: goal.title || 'Untitled goal',
                    description: goal.description || '',
                    dueDate: goal.due_date || null,
                    status: goal.status || 'UNKNOWN',
                })),
                achievements: achievementRows.map((achievement) => ({
                    title: achievement.title || 'Untitled achievement',
                    description: achievement.description || '',
                    achievementDate: achievement.achievement_date || null,
                })),
                highlights: highlightRows.map((highlight) => ({
                    title: highlight.title || 'Untitled highlight',
                    content: highlight.content || '',
                    createdAt: highlight.created_at || null,
                })),
            };
        }));
        const displayName = employeeInfo.names || sessionUser.username || 'Usuario';

        return response.render('pages/home', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Home',
            path: '/home',
            user: sessionUser,
            reportSubjects: {
                employees: [],
                teams: [],
                projects: allVisibleProjects
            },
            myProjects: userProjects,
            latestReports: {},
            latestActivitySections,
            teamActivitySections,
            projectPanels,
            account: {
                image: accountInfo.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=fbfbfe&color=1f2937`,
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
