const { getQuarterContext } = require('../../utils/date.util');

/*
 * Shared helpers used by controllers to create predictable template variables.
 */
const buildDateAndQuarterContext = function buildDateAndQuarterContext() {
    const quarterContext = getQuarterContext();

    return {
        currentDateLabel: quarterContext.currentDateLabel,
        currentQuarterLabel: quarterContext.quarterLabel,
    };
};

const buildQuickReportContext = function buildQuickReportContext(contentType, subjectId) {
    const quarterContext = getQuarterContext();

    return {
        currentDateLabel: quarterContext.currentDateLabel,
        quickReport: {
            contentType,
            subjectId,
            periodStart: quarterContext.periodStart,
            periodEnd: quarterContext.periodEnd,
            quarterLabel: quarterContext.quarterLabel,
        },
    };
};

const buildReportPeriodContext = function buildReportPeriodContext() {
    const quarterContext = getQuarterContext();

    return {
        currentDateLabel: quarterContext.currentDateLabel,
        quickReport: {
            periodStart: quarterContext.periodStart,
            periodEnd: quarterContext.periodEnd,
            quarterLabel: quarterContext.quarterLabel,
        },
    };
};

module.exports = {
    buildDateAndQuarterContext,
    buildQuickReportContext,
    buildReportPeriodContext,
};
