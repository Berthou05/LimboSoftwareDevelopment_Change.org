module.exports = {
    key: 'concepts.report-generation',
    title: 'Prepare useful reports',
    type: 'concept',
    status: 'complete',
    order: 40,
    summary: 'Choose the right subject and period before generating a report.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects', 'Reports'],
    helpKey: 'concepts.report-generation',
    sections: [
        {
            title: 'Main things you need before generating a report',
            body: 'Pick the subject first, then choose a period that matches the decision you need to make. Use employee reports for individual contribution, team reports for group progress, and project reports for delivery status.',
            image: {
                src: '/images/manuals/concepts/report-generation1.webp',
                alt: 'Showcase of the Report Generator. Chose the subject of the report. If in any Employee, Project or Team page, the report content will be fixed.',
                caption: 'Choose your report subject.',
            },
        },
        {
            title: 'Use the shortest period that answers the question',
            body: 'A shorter date range is easier to review and usually produces a clearer report. Use longer ranges only when you need trends, summaries, or quarter-level context.',
            image: {
                src: '/images/manuals/concepts/report-generation2.webp',
                alt: 'Focus on the start and end date of the data obtention for the report..',
                caption: 'Select a proper start and end date for the data collection for the report.',
            },
        },
        {
            title: 'Review the source pages when a report feels incomplete',
            body: 'If a report is missing important context, check the related activity, goals, achievements, highlights, and membership data before generating it again.',
            image: {
                src: '/images/manuals/concepts/report-generation3.webp',
                alt: 'Image of a Project page. Focus on information sections: Activities, Goals, Achievements, Highlights',
                caption: 'Consult your information source.',
            },
        },
    ],
};
