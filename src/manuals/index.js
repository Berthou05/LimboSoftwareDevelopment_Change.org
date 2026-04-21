const quickStart = require('./quickStart');
const projects = require('./projects/projects');
const roles = require('./admin/roles');
const dailyEntries = require('./dailyEntry/dailyEntries');
const reports = require('./reports/reports');

module.exports = [
    quickStart,
    {
        key: 'modules',
        title: 'Workspace guides',
        description: 'Task-focused guides grouped by module instead of duplicating each CRUD action.',
        entries: [
            projects,
            roles,
            dailyEntries,
            reports,
        ],
    },
];
