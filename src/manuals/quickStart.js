const createProject = require('./projects/createProject');
const submitDailyStandup = require('./dailyEntry/submitDailyStandup');
const generateReport = require('./reports/generateReport');
const assignTeamMember = require('./team/assignTeamMember');

module.exports = {
    key: 'quick-start',
    title: 'Quick Start',
    description: 'First-use guides for the most common setup tasks a new user completes in the application.',
    entries: [
        createProject,
        submitDailyStandup,
        generateReport,
        assignTeamMember,
    ],
};
