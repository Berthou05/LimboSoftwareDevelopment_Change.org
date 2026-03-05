const {
    getReports,
    generateReport,
} = require('../../data/repositories/inMemory/mockData.repository');

const listReports = function listReports() {
    return getReports();
};

const createReport = function createReport(payload) {
    return generateReport(payload);
};

/*
 * Returns the most recent report for each content type (EMPLOYEE, TEAM, PROJECT).
 */
const getLatestReportsByType = function getLatestReportsByType() {
    const reports = getReports();
    const latestByType = {
        EMPLOYEE: null,
        TEAM: null,
        PROJECT: null,
    };

    for (const report of reports) {
        if (!latestByType[report.contentType]) {
            latestByType[report.contentType] = report;
        }
    }

    return latestByType;
};

module.exports = {
    listReports,
    createReport,
    getLatestReportsByType,
};
