const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Account = require('../../models/account');
const Team = require('../../models/team');
const Activity = require('../../models/activity');

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
        const authorName = activity.full_name || 'Unknown';

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

exports.getHome = async (request, response, next) => {
    const sessionUser = request.session.user || {};
    const userId = sessionUser.id;
    const employeeId = sessionUser.employeeId;

    try {
        const [userProjects] = await Project.fetchByEmployeeId(userId);
        const [otherProjects] = await Project.fetchNotByEmployeeId(userId);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        const [accountRows] = userId ? await Account.fetchById(userId) : [[]];
        const [employeeRows] = employeeId ? await Employee.getNamesByEmployeeId(employeeId) : [[]];
        const [teamRows] = employeeId ? await Team.fetchByEmployeeId(employeeId) : [[]];

        const accountInfo = accountRows[0] || {};
        const employeeInfo = employeeRows[0] || {};
        const teamRow = (teamRows && teamRows[0]) || null;
        const team = teamRow ? { id: teamRow.team_id, name: teamRow.name } : null;

        const activityFilter = resolveActivityFilter(request.query);
        const activityPromise = activityFilter.error
            ? Promise.resolve({ rows: [], error: activityFilter.error })
            : team
                ? (activityFilter.isFiltered
                    ? Activity.getTeamMembersActivities(team.id, activityFilter.rangeStart, activityFilter.rangeEnd)
                    : Activity.getTeamMembersActivities(team.id))
                    .then(([rows]) => ({ rows, error: '' }))
                    .catch((error) => {
                        console.log(error);
                        return { rows: [], error: 'The activity log could not be loaded. Please try again.' };
                    })
                : Promise.resolve({ rows: [], error: '' });

        const [{ rows: activityRows, error: activityError }] = await Promise.all([activityPromise]);
        const memberActivities = activityRows || [];
        const activitySections = buildActivitySections(memberActivities);

        const displayName = employeeInfo.names || sessionUser.username || 'Usuario';

        return response.render('pages/home', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Home',
            path: '/home',
            user: sessionUser,
            reportSubjects: {
                employees: [],
                teams: [],
                projects: allVisibleProjects,
            },
            myProjects: userProjects,
            latestReports: {},
            account: {
                image: accountInfo.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=fbfbfe&color=1f2937`,
            },
            employee: {
                names: displayName,
            },
            team,
            teamPath: '/home',
            activitySections,
            activityFilter,
            activityError,
        });
    } catch (error) {
        console.log('Error en Home Controller:', error);
        next(error);
    }
};