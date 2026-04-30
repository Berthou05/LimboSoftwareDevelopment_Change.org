module.exports = {
    key: 'concepts.report-generation',
    title: 'Prepare useful reports',
    type: 'concept',
    status: 'complete',
    order: 40,
    summary: 'Prepare the source data each report type needs before generating it.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects', 'Reports'],
    helpKey: 'concepts.report-generation',
    sections: [
        {
            title: 'Employee reports depend on useful standups',
            body: 'Employee reports are strongest when daily standups are clear, consistent, and connected to real work. A good employee report needs completed work, plans, blockers, and project context so the generated summary can explain contribution instead of only listing activity.',
        },
        {
            title: 'Project reports depend on project maintenance',
            body: 'Project reports need more than activity. The project lead should keep goals, achievements, highlights, members, and involved teams updated so the report can explain delivery status, progress, and important outcomes correctly.',
        },
        {
            title: 'Team reports depend on both people and project context',
            body: 'Team reports combine member activity with the projects where the team participates. They are more useful when team members write good standups and project leads keep project goals, achievements, and highlights current.',
        },
        {
            title: 'Choose the shortest useful period',
            body: 'Use the smallest date range that answers the question. Short ranges are better for check-ins and follow-up. Longer ranges are better for trends, retrospectives, and broader summaries.',
        },
    ],
};
