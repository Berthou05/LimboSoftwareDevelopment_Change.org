const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');

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
        const rawDate = activity.completed_at;
        const key = rawDate ? new Date(rawDate).toISOString().slice(0, 10) : 'unknown';
        const items = grouped.get(key) || [];

        items.push({
            title: activity.title || 'Untitled activity',
            description: activity.description || '',
            content: activity.description || '',
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
        ] = await Promise.all([
            Project.fetchByEmployeeId(userId),
            Project.fetchNotByEmployeeId(userId),
            userId ? Account.fetchById(userId) : Promise.resolve([[]]),
            employeeId ? Employee.getNamesByEmployeeId(employeeId) : Promise.resolve([[]]),
            employeeId ? Activity.fetchByEmployee(employeeId) : Promise.resolve([[]]),
        ]);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        const accountInfo = accountRows[0] || {};
        const employeeInfo = employeeRows[0] || {};
        // Home only needs a short recent feed, not the full employee activity history.
        const latestActivitySections = buildActivitySections(activityRows.slice(0, 6));
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
