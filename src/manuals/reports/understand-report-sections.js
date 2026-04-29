module.exports = {
    key: 'reports.understand-report-sections',
    title: 'Use report sections',
    type: 'reference',
    status: 'draft',
    order: 30,
    summary: 'Read generated reports quickly and decide what needs follow-up.',
    appliesTo: ['Reports'],
    helpKey: 'reports.understand-report-sections',
    sections: [
        {
            title: 'Start with the section that matches your decision',
            body: 'If you need status, read the progress and summary sections first. If you need risks, look for blockers, missing activity, or overdue work before reading every detail.',
        },
        {
            title: 'Use bullets as review prompts',
            body: 'Treat report bullets as prompts for follow-up. A vague bullet usually means the related activity, goal, or achievement needs clearer source data before the next report.',
            items: ['Check unclear bullets against the source page.', 'Update missing context before regenerating.', 'Copy the report only after reviewing the important sections.'],
        },
        {
            title: 'Do not treat generated text as final without review',
            body: 'Reports are useful drafts for communication and analysis. Review names, dates, project context, and conclusions before sharing the copied text.',
        },
    ],
};
