module.exports = {
    key: 'reports.understand-report-sections',
    title: 'Understand report sections',
    type: 'reference',
    status: 'draft',
    order: 30,
    summary: 'Understand the general structure used by generated report pages.',
    appliesTo: ['Reports'],
    helpKey: 'reports.understand-report-sections',
    sections: [
        {
            title: 'Report layout',
            body: 'Generated reports are displayed as sections. A section can contain direct list items or grouped items.',
        },
        {
            title: 'Supported report content',
            body: 'The renderer supports section titles, groups, subgroups, and item lists.',
            items: ['Section title', 'Group title', 'Subgroup title', 'List items'],
        },
        {
            title: 'Draft status',
            body: 'This guide is draft because report content is generated dynamically and exact section names can change with the report prompt.',
        },
    ],
};
