module.exports = {
    key: 'employees.view-employee-activity',
    title: 'View employee activity',
    type: 'workflow',
    status: 'complete',
    order: 30,
    summary: 'Filter and review activity entries on an employee profile.',
    appliesTo: ['Employees', 'Home', 'Projects'],
    helpKey: 'employees.view-employee-activity',
    sections: [
        {
            title: 'Activity filters',
            body: 'Use today, week, month, quarter, or all filters to change the visible activity period.',
        },
        {
            title: 'Project filter',
            body: 'Use the project selector to show all activity or only activity connected to one project.',
        },
        {
            title: 'Change activity project',
            body: 'On your own profile, use `Change project` to connect an activity entry to a different project or remove the project connection.',
        },
    ],
};
