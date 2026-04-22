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
    projects
];
