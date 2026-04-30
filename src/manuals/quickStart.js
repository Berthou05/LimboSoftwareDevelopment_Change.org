const createTeam = require('./teams/managingTeams/create');
const createProject = require('./projects/managingProjects/create');
const submitDailyStandup = require('./quick-start/submit-a-daily-standup');
const generateReport = require('./reports/generate-report');

module.exports = {
    key: 'quick-start',
    title: 'Quick Start',
    description: 'Onboarding guides for the first actions a new user performs in the system.',
    entries: [
        createTeam,
        createProject,
        submitDailyStandup,
        generateReport,
    ],
};
