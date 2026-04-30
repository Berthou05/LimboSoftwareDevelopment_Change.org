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
        {
            title: 'Open a report generator',
            body: 'Use the `Generate Report` panel on Home, an employee profile, a team page, or a project page.',
            image: {
                src: '/images/manuals/reports/report-generation1.webp',
                alt: 'Generate Report panel on a system page',
                caption: 'Start from a page that includes the Generate Report panel.',
            },
        },
        {
            title: 'Select a subject',
            body: 'Choose the employee, team, or project when the panel includes subject search.',
            image: {
                src: '/images/manuals/reports/report-generation2.webp',
                alt: 'Report subject selection controls',
                caption: 'Select the subject that the report should summarize.',
            },
        },
        {
            title: 'Select dates',
            body: 'Choose the period start and period end.',
            image: {
                src: '/images/manuals/reports/report-generation3.webp',
                alt: 'Report date range fields',
                caption: 'Choose the date range before generating the report.',
            },
        },
        {
            title: 'Generate',
            body: 'Click `Generate Report` and wait for the success message.',
            image: {
                src: '/images/manuals/reports/report-generation4.webp',
                alt: 'Generated report confirmation',
                caption: 'Generate the report and open the latest generated report when needed.',
            },
        },
    ],
};
