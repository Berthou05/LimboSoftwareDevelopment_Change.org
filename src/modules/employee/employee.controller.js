/*
Title: employee.controller.js
Last modification: March 26,2026
Modified by: Hurtado, R.
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');
const Team = require('../../models/team');
const Employee = require('../../models/employee');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');

//--------------------------- Auxiliar Functions ---------------------------

/*buildAvatarUrl(fullName)
Auxiliar function responsible for creating a random avatar based on an employee fullName*/

const buildAvatarUrl = function buildAvatarUrl(fullName) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=fbfbfe&color=1f2937`;
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

const normalizeDirectoryEmployee = function normalizeDirectoryEmployee(employee, currentEmployeeId = '') {
    const employeeId = employee.employee_id || '';
    const fullName = employee.full_name || 'Unknown employee';

    return {
        id: employeeId,
        fullName,
        slackUsername: employee.slack_username || '',
        email: employee.email || '',
        image: employee.image || buildAvatarUrl(fullName),
        isSelf: Boolean(currentEmployeeId) && employeeId === currentEmployeeId,
    };
};

const getOwnEmployeeUrl = function getOwnEmployeeUrl(employeeId) {
    return `/employees/${employeeId}`;
};

//--------------------------- Main Functions ---------------------------

/*getEmployee()
Function responsible accesing the intermediate employee page
only available for Lead and Admin.
Rendering the following information:

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Employee`,
pageSubtitle: 'Intermediate selection for self and other employees.',
me:me,
employees:near_employees,
*/

exports.getEmployee = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const ownEmployeeUrl = getOwnEmployeeUrl(employeeId);

    return Employee.searchDirectoryByLeadScope(employeeId, '')
        .then(([directoryEmployees]) => {
            if (directoryEmployees.length === 0) {
                return response.redirect(ownEmployeeUrl);
            }

            const employees = directoryEmployees.map((employee) => {
                return normalizeDirectoryEmployee(employee, employeeId);
            });

            return response.render('pages/employeeDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: 'Employee',
                pageSubtitle: 'Intermediate selection for self and other employees.',
                employees,
                query: '',
            });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Error loading Intermediate';
            return response.redirect('/home');
        });
};

/*searchEmployees
Function responsible for returning filtered employee-directory HTML and autocomplete suggestions. */

exports.searchEmployees = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const ownEmployeeUrl = getOwnEmployeeUrl(employeeId);
    const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';

    return Promise.all([
        Employee.searchDirectoryByLeadScope(employeeId, query),
        Employee.getDirectorySuggestionsByLeadScope(employeeId, query),
    ])
        .then(([
            [directoryEmployees],
            [suggestionEmployees],
        ]) => {
            if (query === '' && directoryEmployees.length === 0) {
                return response.status(403).json({
                    redirectUrl: ownEmployeeUrl,
                });
            }

            const employees = directoryEmployees.map((employee) => {
                return normalizeDirectoryEmployee(employee, employeeId);
            });
            const suggestions = suggestionEmployees.map((employee) => {
                const normalizedEmployee = normalizeDirectoryEmployee(employee, employeeId);
                return {
                    id: normalizedEmployee.id,
                    fullName: normalizedEmployee.fullName,
                    slackUsername: normalizedEmployee.slackUsername,
                    email: normalizedEmployee.email,
                    isSelf: normalizedEmployee.isSelf,
                };
            });

            return response.render('partials/employeeDirectory/employeeDirectoryResults', {
                layout: false,
                employees,
            }, (renderError, resultsHtml) => {
                if (renderError) {
                    console.log(renderError);
                    return response.status(500).json({
                        error: 'Unable to search employees right now.',
                    });
                }

                return response.json({
                    query,
                    resultsHtml,
                    suggestions,
                    totalEmployees: employees.length,
                });
            });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).json({
                error: 'Unable to search employees right now.',
            });
        });
};

/*getEmployeePage
Function responsible for rendering a concrete employee page
Render of:

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Employee ${info[0].full_name}`,
pageSubtitle: '',
info:info,
activities:activities,
teams:teams,
projects:projects,*/

exports.getEmployeePage = (request, response, next) => {
    const employeeId = request.params.employee_id;
    const currentEmployeeId = request.session.employeeId || '';
    const ownEmployeeUrl = getOwnEmployeeUrl(currentEmployeeId);

    const canAccessPromise = employeeId === currentEmployeeId
        ? Promise.resolve(true)
        : Employee.canViewInLeadScope(currentEmployeeId, employeeId).then(([rows]) => rows.length > 0);

    return canAccessPromise
        .then((hasAccess) => {
            if (!hasAccess) {
                return response.redirect(ownEmployeeUrl);
            }

            const activityFilter = resolveActivityFilter(request.query);
            const activityPromise = activityFilter.error
                ? Promise.resolve([[]])
                : Activity.fetchByEmployee(
                    employeeId,
                    activityFilter.rangeStart,
                    activityFilter.rangeEnd,
                );

            return Promise.all([
                EmployeeTeam.fetchTeamInfoByEmployee(employeeId),
                Employee.fetchById(employeeId),
                activityPromise,
                Project.getProjectByEmployeeId(employeeId),
            ])
                .then(([
                    [team],
                    [info],
                    [activities],
                    [employeeProjects],
                ]) => {
                    if (!info.length) {
                        request.session.error = `Error loading Employee ${employeeId}. Employee information not found.`;
                        return response.redirect('/employees');
                    }

                    const projectRows = employeeProjects.map((project) => ({
                        project: {
                            id: project.project_id,
                            name: project.name,
                        },
                        roleName: project.coll_description || 'MEMBER',
                        startDateLabel: formatDayLabel(project.started_at),
                    }));

                    const teamRows = team.map((memberTeam) => ({
                        team_id: memberTeam.team_id,
                        team: {
                            id: memberTeam.team_id,
                            name: memberTeam.name,
                        },
                        roleName: memberTeam.role || 'EMPLOYEE',
                        startDateLabel: formatDayLabel(memberTeam.joined_at),
                    }));

                    const employee = {
                        id: info[0].employee_id,
                        employee_id: info[0].employee_id,
                        full_name: info[0].full_name,
                        image: buildAvatarUrl(info[0].full_name),
                    };

                    const reportSubjects = {
                        employees: [
                            {
                                id: employeeId,
                                name: employee.full_name,
                            },
                        ],
                        teams: [],
                        projects: [],
                    };

                    return response.render('pages/employeeDetails', {
                        csrfToken: request.csrfToken(),
                        isLoggedIn: request.session.isLoggedIn || '',
                        username: request.session.username || '',
                        pageTitle: `Employee ${info[0].full_name}`,
                        pageSubtitle: '',
                        employee,
                        isOwnProfile: currentEmployeeId === info[0].employee_id,
                        activitySections: buildActivitySections(activities),
                        activityFilter,
                        activityError: activityFilter.error || '',
                        teamRows,
                        projectRows,
                        defaultReportType: 'EMPLOYEE',
                        defaultSubjectId: employeeId,
                        reportSubjects,
                        latestReports: '',
                        quickReport: '',
                    });
                })
                .catch((error) => {
                    console.log(error);
                    request.session.error = `Error loading Employee ${employeeId}.`;
                    return response.redirect('/employees');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = `Error validating access for Employee ${employeeId}.`;
            return response.redirect('/employees');
        });
};


