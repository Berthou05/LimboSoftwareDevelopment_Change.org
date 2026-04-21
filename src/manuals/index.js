const quickStart = require('./quickStart');
const projects = require('./projects/projects');
const admin = require('./admin/admin');
const dailyEntries = require('./dailyEntry/dailyEntries');
const reports = require('./reports/reports');
const teams = require('./team/team');
const employees = require('./employee/employee');

module.exports = [
    quickStart,
    {
        key: 'modules',
        title: 'Workspace guides',
        description: 'Task-focused guides grouped by module instead of duplicating each CRUD action.',
        entries: [
            projects,
            teams,
            employees,
            admin,
            dailyEntries,
            reports,
        ],
    },
];
