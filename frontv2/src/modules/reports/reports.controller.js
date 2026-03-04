const { listReports, createReport } = require("./reports.service");
const { renderModule } = require("../shared/view.util");
const { findSubjectOptions } = require("../shared/subject-options.service");
const { hasValidDateRange } = require("../../utils/date.util");
const { buildReportPeriodContext } = require("../shared/page-context.util");

// Reports controller: report page render + generation action.
function renderReports(req, res) {
  const { currentDateLabel, quickReport } = buildReportPeriodContext();

  return renderModule(res, "pages/reports", {
    activeRoute: "/reports",
    pageTitle: "Reports",
    pageSubtitle: "Report search, generation, and download simulation.",
    reportSubjects: findSubjectOptions(),
    reports: listReports(),
    defaultReportType: "PROJECT",
    defaultSubjectId: "",
    currentDateLabel,
    quickReport,
  });
}

function handleGenerateReport(req, res) {
  const { contentType, subjectId, periodStart, periodEnd, redirectTo } = req.body;

  if (!hasValidDateRange(periodStart, periodEnd)) {
    req.session.flash = {
      type: "danger",
      message: "Invalid report date range. Ensure start date is not after end date.",
    };
    return res.redirect(redirectTo || "/reports");
  }

  createReport({
    contentType,
    subjectId,
    periodStart,
    periodEnd,
    requestedBy: req.session.user.employeeId,
  });

  req.session.flash = {
    type: "success",
    message: "Report generated and added to the reports list.",
  };
  return res.redirect(redirectTo || "/reports");
}

module.exports = {
  renderReports,
  handleGenerateReport,
};

