const systemOverview = require('./systemOverview');
const createProject = require('./projects/createProject');
const submitDailyStandup = require('./dailyEntry/submitDailyStandup');
const generateReport = require('./reports/generateReport');
const assignTeamMember = require('./team/assignTeamMember');

module.exports = {
    key: 'quick-start',
    title: 'Quick Start',
    description: 'Onboarding guides for the first actions a new user performs in the system.',
    entries: [
        systemOverview,
        createProject,
        submitDailyStandup,
        generateReport,
        assignTeamMember,
    ],
};
