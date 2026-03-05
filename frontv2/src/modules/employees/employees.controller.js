const { listEmployees, findEmployeeById } = require('./employees.service');
const { renderModule, filterByQuery } = require('../shared/view.util');
const { findFilteredSubjectOptions } = require('../shared/subject-options.service');
const { buildQuickReportContext } = require('../shared/page-context.util');
const {
    groupActivitiesByDay,
    buildEmployeeTeamRows,
    buildEmployeeProjectRows,
} = require('../shared/activity-sections.util');
const { getLatestReportsByType } = require('../reports/reports.service');

/*
 * Check if the user has lead-level access (Lead or Admin role).
 */
const isLeadOrAdmin = function isLeadOrAdmin(user) {
    const roleName = String(user?.roleName || '').toLowerCase();
    return roleName === 'lead' || roleName === 'admin';
};

const renderEmployees = function renderEmployees(req, res) {
    const currentUser = req.session.user;

    // Regular employees are redirected directly to their own profile
    if (!isLeadOrAdmin(currentUser)) {
        return res.redirect(`/employees/${currentUser.employeeId}`);
    }

    const query = req.query.q || '';
    const employees = filterByQuery(listEmployees(), query, ['fullName', 'title']);

    return renderModule(res, 'pages/employees', {
        activeRoute: '/employees',
        pageTitle: 'Employee',
        pageSubtitle: 'Intermediate selection for own profile, team members, and other employees.',
        employees,
        query,
    });
};

/*
 * Detail page flow is intentionally explicit for onboarding:
 * - read employee,
 * - validate existence,
 * - derive page-specific view model,
 * - render template.
 */
const renderEmployeeDetail = function renderEmployeeDetail(req, res) {
    const employeeId = req.params.id;
    const employee = findEmployeeById(employeeId);
    const currentUser = req.session.user;

    if (!employee) {
        req.session.flash = {
            type: 'danger',
            message: 'Employee not found.',
        };

        return res.redirect('/employees');
    }

    const employeeDetail = listEmployees().find((candidate) => candidate.id === employee.id);
    const isOwnProfile = req.session.user.employeeId === employee.id;

    const { currentDateLabel, quickReport } = buildQuickReportContext(
        'EMPLOYEE',
        employeeDetail.id,
    );

    const activitySections = groupActivitiesByDay(employeeDetail.activityLog);
    const teamRows = buildEmployeeTeamRows(employeeDetail);
    const projectRows = buildEmployeeProjectRows(employeeDetail);

    return renderModule(res, 'pages/employeeDetail', {
        activeRoute: '/employees',
        pageTitle: employeeDetail.fullName,
        pageSubtitle: 'Employee page with profile data, activity log, and report generation.',
        employee: employeeDetail,
        isOwnProfile,
        reportSubjects: findFilteredSubjectOptions(currentUser.employeeId, currentUser.roleName),
        defaultReportType: 'EMPLOYEE',
        defaultSubjectId: employeeDetail.id,
        currentDateLabel,
        quickReport,
        activitySections,
        teamRows,
        projectRows,
        latestReports: getLatestReportsByType(),
    });
};

module.exports = {
    renderEmployees,
    renderEmployeeDetail,
};
