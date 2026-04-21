const shared = require('./shared');
const projects = require('./projects');
const roles = require('./roles');
const dailyEntries = require('./dailyEntries');
const reports = require('./reports');

module.exports = [
    shared,
    {
        key: 'workspace',
        title: 'Workspace guides',
        description: 'Task-focused guides grouped by module instead of duplicating each CRUD action.',
        entries: [projects, roles, dailyEntries, reports],
    },
];
