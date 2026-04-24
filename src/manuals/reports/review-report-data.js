module.exports = {
    key: 'reports.review-report-data',
    title: 'Review report data',
    type: 'workflow',
    status: 'complete',
    order: 20,
    summary: 'Open and copy the generated report output.',
    appliesTo: ['Reports'],
    helpKey: 'reports.review-report-data',
    sections: [
        {
            title: 'Open the latest report',
            body: 'After a report is generated, use the Last Generated Report link to open it.',
        },
        {
            title: 'Review the report',
            body: 'The report page displays formatted report sections in the browser.',
        },
        {
            title: 'Copy the report',
            body: 'Use the `Copy` action to copy the visible report text.',
        },
    ],
};
