const createProject = require('./projects/createProject');
const submitDailyStandup = require('./dailyEntry/slackStandups');
const generateReport = require('./reports/generate-report');
const assignTeamMember = require('./teams/assignTeamMember');

module.exports = {
    key: 'quick-start',
    title: 'Quick Start',
    description: 'Onboarding guides for the first actions a new user performs in the system.',
    entries: [
        createProject,
        submitDailyStandup,
        generateReport,
        assignTeamMember,
    ],
};
