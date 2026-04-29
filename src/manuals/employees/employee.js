const profile = require('./view-employee-profile');
const projects = require('./view-employee-projects');
const activity = require('./view-employee-activity');
const teams = require('./view-employee-teams');

module.exports = {
    key: 'employees',
    title: 'Employees',
    description: 'Guides for browsing the employee directory and reviewing employee details.',
    entries: [
        profile,
        projects,
        activity,
        teams,
    ],
};
