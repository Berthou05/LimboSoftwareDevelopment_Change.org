const { getHomeByEmployeeId } = require('./home.service');
const { renderModule } = require('../shared/view.util');
const { buildReportPeriodContext } = require('../shared/page-context.util');
const { groupActivitiesByDay } = require('../shared/activity-sections.util');
const { findFilteredSubjectOptions } = require('../shared/subject-options.service');
const { getLatestReportsByType } = require('../reports/reports.service');

/*
 * Home page flow:
 * 1) Load employee-scoped home data from service.
 * 2) Pre-group activity so view can render without data manipulation.
 */
const renderHome = function renderHome(req, res) {
    const employeeId = req.session.user.employeeId;
    const roleName = req.session.user.roleName;
    const homeData = getHomeByEmployeeId(employeeId);

    if (!homeData) {
        req.session.flash = {
            type: 'danger',
            message: 'Unable to load home data.',
        };

        return res.redirect('/login');
    }

    const { quickReport } = buildReportPeriodContext();

    const latestActivitySections = groupActivitiesByDay(homeData.latestActivity);
    const teamActivitySections = groupActivitiesByDay(homeData.teamActivity);

    // Home sidebar uses a single project for compact summary cards.
    const primaryProject = (homeData.projectPanels || [])[0] || null;

    return renderModule(res, 'pages/home', {
        activeRoute: '/home',
        pageTitle: 'Home',
        pageSubtitle: 'Latest activity, team activity, and project highlights.',
        latestActivitySections,
        teamActivitySections,
        primaryProject,
        projectPanels: homeData.projectPanels,
        employee: homeData.employee,
        reportSubjects: findFilteredSubjectOptions(employeeId, roleName),
        defaultReportType: 'EMPLOYEE',
        defaultSubjectId: employeeId,
        quickReport,
        latestReports: getLatestReportsByType(),
    });
};

module.exports = {
    renderHome,
};