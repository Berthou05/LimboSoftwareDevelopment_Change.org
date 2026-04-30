const reportGeneration = require('./report-generation');
const slackStandups = require('./slack-standups');

module.exports = {
    key: 'concepts',
    title: 'System Overview',
    description: 'Concept guides for using the main areas of the system effectively.',
    entries: [
        reportGeneration,
        slackStandups,
    ],
};
