module.exports = {
    key: 'concepts.report-generation',
    title: 'How reports are generated',
    type: 'concept',
    status: 'complete',
    order: 40,
    summary: 'Understand what the report generator does and where reports can be created.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects', 'Reports'],
    helpKey: 'concepts.report-generation',
    sections: [
        {
            title: 'Report subjects',
            body: 'Reports can be generated for employees, teams, and projects when those subjects are available to the current page.',
        },
        {
            title: 'Report period',
            body: 'The date range controls which period the report covers.',
        },
        {
            title: 'Generated output',
            body: 'After generation, the report page displays formatted sections and includes a copy action for the visible report text.',
        },
    ],
};
