const projects = require('./projects');
const roles = require('./admin');
const dailyEntries = require('./dailyEntry');
const reports = require('./reports');

module.exports = {
    key: 'modules',
    title: 'Workspace guides',
    description: 'Task-focused guides grouped by module instead of duplicating each CRUD action.',
    entries: [
        projects, 
        roles, 
        dailyEntries, 
        reports
    ],
}