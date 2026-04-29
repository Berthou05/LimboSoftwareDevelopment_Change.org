const quickStart = require('./quickStart');
const systemOverview = require('./systemOverview');
const projects = require('./projects/projects');
const admin = require('./admin');
const slackStandups = require('./dailyEntry');
const reports = require('./reports/reports');
const teams = require('./teams/teams');
const employees = require('./employees/employee');
const account = require('./account/account');

module.exports = [
    quickStart,
    systemOverview,
    projects,
    teams,
    employees,
    admin,
    slackStandups,
    reports,
    account,
];
