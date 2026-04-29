const generateReport = require('./generate-report');
const reviewReportData = require('./review-report-data');
const understandReportSections = require('./understand-report-sections');

module.exports = {
    key: 'reports',
    title: 'Reports',
    description: 'Guides for generating, reviewing, and understanding system reports.',
    entries: [
        generateReport,
        reviewReportData,
        understandReportSections,
    ],
};
