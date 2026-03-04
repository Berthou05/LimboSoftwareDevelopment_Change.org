const { getQuarterContext } = require("../../utils/date.util");

// Shared page-context helpers keep controller code simple and consistent.
// These helpers only shape view data; they do not perform I/O or business logic.
// Used by pages that only need "today" + current quarter badge (home/admin).
function buildDateAndQuarterContext() {
  const { quarterLabel, currentDateLabel } = getQuarterContext();
  return {
    currentDateLabel,
    currentQuarterLabel: quarterLabel,
  };
}

// Used by detail pages to prefill one-click report generation forms.
// contentType + subjectId identify what entity the report should target by default.
function buildQuickReportContext(contentType, subjectId) {
  const { quarterLabel, periodStart, periodEnd, currentDateLabel } = getQuarterContext();
  return {
    currentDateLabel,
    quickReport: {
      contentType,
      subjectId,
      periodStart,
      periodEnd,
      quarterLabel,
    },
  };
}

// Used by reports page: default date range without binding to a specific subject.
function buildReportPeriodContext() {
  const { quarterLabel, periodStart, periodEnd, currentDateLabel } = getQuarterContext();
  return {
    currentDateLabel,
    quickReport: {
      periodStart,
      periodEnd,
      quarterLabel,
    },
  };
}

module.exports = {
  buildDateAndQuarterContext,
  buildQuickReportContext,
  buildReportPeriodContext,
};


