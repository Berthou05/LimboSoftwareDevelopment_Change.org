const quickStart = require('./quickStart');
const systemOverview = require('./concepts');
const projects = require('./projects/project');
const admin = require('./admin');
const reports = require('./reports');
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
    reports,
    account,
];
