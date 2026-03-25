/*
 * Date formatting helpers used by controllers and shared view utilities.
 */
const formatLongDate = function formatLongDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

const formatShortDate = function formatShortDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/*
 * Returns quarter metadata used for report defaults and home/admin badges.
 */
const getQuarterContext = function getQuarterContext(now = new Date()) {
    const quarter = Math.floor(now.getMonth() / 3) + 1;

    const quarterStart = new Date(now.getFullYear(), (quarter - 1) * 3, 1);
    const quarterEnd = new Date(now.getFullYear(), quarter * 3, 0);

    return {
        quarter,
        quarterLabel: `Q${quarter}`,
        quarterStart,
        quarterEnd,
        periodStart: quarterStart.toISOString().slice(0, 10),
        periodEnd: quarterEnd.toISOString().slice(0, 10),
        currentDateLabel: formatLongDate(now),
    };
};

const hasValidDateRange = function hasValidDateRange(periodStart, periodEnd) {
    if (!periodStart || !periodEnd) {
        return false;
    }

    return new Date(periodStart).getTime() <= new Date(periodEnd).getTime();
};

module.exports = {
    formatLongDate,
    formatShortDate,
    getQuarterContext,
    hasValidDateRange,
};
