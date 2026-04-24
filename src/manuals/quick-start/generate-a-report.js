module.exports = {
    key: 'quick-start.generate-a-report',
    title: 'Generate a report',
    type: 'tutorial',
    status: 'complete',
    order: 30,
    summary: 'Generate a report from a home, employee, team, or project report generator.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects', 'Reports'],
    helpKey: 'quick-start.generate-a-report',
    steps: [
        {
            title: 'Find Generate Report',
            body: 'Open a page that has the `Generate Report` panel.',
        },
        {
            title: 'Choose the report subject',
            body: 'Select an employee, team, or project when the panel allows more than one subject.',
        },
        {
            title: 'Choose the date range',
            body: 'Select the start and end dates for the period you want the report to cover.',
        },
        {
            title: 'Generate and open the report',
            body: 'Click `Generate Report`. After it finishes, use the last generated report link to open the report page.',
        },
    ],
};
