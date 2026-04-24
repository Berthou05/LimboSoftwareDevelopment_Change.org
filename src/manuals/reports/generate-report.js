module.exports = {
    key: 'reports.generate-report',
    title: 'Generate report',
    type: 'tutorial',
    status: 'complete',
    order: 10,
    summary: 'Create a report for an employee, team, or project.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects', 'Reports'],
    helpKey: 'reports.generate-report',
    steps: [
        { title: 'Open a report generator', body: 'Use the `Generate Report` panel on Home, an employee profile, a team page, or a project page.' },
        { title: 'Select a subject', body: 'Choose the employee, team, or project when the panel includes subject search.' },
        { title: 'Select dates', body: 'Choose the period start and period end.' },
        { title: 'Generate', body: 'Click `Generate Report` and wait for the success message.' },
    ],
};
