const createProject = require('./quick-start/create-your-first-project');
const submitDailyStandup = require('./quick-start/submit-a-daily-standup');
const generateReport = require('./quick-start/generate-a-report');
const assignTeamMember = require('./quick-start/assign-a-team-member');

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
