module.exports = {
    key: 'reports.generate',
    title: 'Generating reports',
    summary: 'Keeps report setup, filter selection, and output review together because users think of it as one reporting flow.',
    appliesTo: ['Reports', 'Home'],
    helpKey: 'reports.generate',
    steps: [
        { title: 'Choose the report scope', body: 'Start with employee, team, or project so the same guide can cover the shared report generator used across the system.' },
        { title: 'Set the date range and filters', body: 'Reuse the shared tables and validation language for date rules instead of rewriting it inside each report type.' },
        { title: 'Review or regenerate the output', body: 'Close with how to validate the generated report and when to adjust the input before trying again.' },
    ],
};
