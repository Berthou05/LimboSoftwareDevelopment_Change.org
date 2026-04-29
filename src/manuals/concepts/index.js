const systemOverview = require('./system-overview');
const activityTracking = require('./activity-tracking');
const rolesAndPermissions = require('./roles-and-permissions');
const reportGeneration = require('./report-generation');
const slackStandups = require('./slack-standups');

module.exports = {
    key: 'concepts',
    title: 'System Overview',
    description: 'Concept guides for using the main areas of the system effectively.',
    entries: [
        systemOverview,
        activityTracking,
        rolesAndPermissions,
        reportGeneration,
        slackStandups,
    ],
};
