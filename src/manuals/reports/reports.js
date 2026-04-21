module.exports = {
    key: 'reports',
    title: 'Reports',
    description: 'Guides for generating reports and reading the output created by the reporting workflow.',
    entries: [
        {
            key: 'reports.generate-reports',
            title: 'Generate reports',
            summary: 'Create reports from the shared report generator.',
            appliesTo: ['Reports'],
            helpKey: 'reports.generate-reports',
            steps: [
                {
                    title: 'Open the report generator',
                    body: 'Start from Home, Team, Projects or Employee screens where the report generator is available.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for report generator entry point screenshot',
                        caption: 'Replace this placeholder with the report generator screenshot.',
                    },
                },
                {
                    title: 'Choose the report subject and date range',
                    body: 'Select the employee, team, or project you want to summarize and set the report dates before generating the result.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for report filters screenshot',
                        caption: 'Replace this placeholder with the report filters screenshot.',
                    },
                },
                {
                    title: 'Generate the report',
                    body: 'Run the generator and wait for the report to open once the summary is ready.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for generated report screenshot',
                        caption: 'Replace this placeholder with the generated report screenshot.',
                    },
                },
            ],
        },
        {
            key: 'reports.read-generated-output',
            title: 'Read generated output',
            summary: 'Understand how to review the generated report and decide whether the input needs to change.',
            appliesTo: ['Reports'],
            helpKey: 'reports.read-generated-output',
            steps: [
                {
                    title: 'Read the summary first',
                    body: 'Start with the main generated output before copying or sharing the report.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for report output screenshot',
                        caption: 'Replace this placeholder with the report output screenshot.',
                    },
                },
                {
                    title: 'Check whether the scope matches your goal',
                    body: 'Review the report subject and dates to confirm the generated text reflects the correct time range and record set.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for report scope review screenshot',
                        caption: 'Replace this placeholder with the report scope review screenshot.',
                    },
                },
                {
                    title: 'Regenerate if needed',
                    body: 'If the result is not what you expected, adjust the report subject or date range and generate it again.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for report regeneration screenshot',
                        caption: 'Replace this placeholder with the report regeneration screenshot.',
                    },
                },
            ],
        },
    ],
};
