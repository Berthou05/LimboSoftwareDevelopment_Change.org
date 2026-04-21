const quickStart = require('./quickStart');
const projects = require('./projects/projects');
const admin = require('./admin/admin');
const slackStandups = require('./dailyEntry/slackStandups');
const reports = require('./reports/reports');
const teams = require('./team/team');
const employees = require('./employee/employee');
const account = require('./account/account');

module.exports = [
    quickStart,
    {
        key: 'modules',
        title: 'Modules',
        description: 'Task-focused guides grouped by module so related actions stay together.',
        entries: [
            projects,
            teams,
            employees,
            admin,
            slackStandups,
            reports,
            account,
        ],
    },
];
