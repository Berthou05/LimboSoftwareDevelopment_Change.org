const createProject = require('./createProject');
const submitDailyStandup = require('./submitDailyStandup');
const generateReport = require('./generateReport');
const assignTeamMember = require('./assignTeamMember');

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
