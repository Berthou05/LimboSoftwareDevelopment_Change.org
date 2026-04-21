module.exports = {
    key: 'daily-entries.slack',
    title: 'Submitting a Slack daily entry',
    summary: 'Explains the Slack flow as one entry because the user goal is to submit a complete update, not to learn each field separately.',
    appliesTo: ['Slack standups', 'Daily entry'],
    helpKey: 'daily-entries.slack',
    steps: [
        {
            title: 'Start from the Slack prompt',
            body: 'The guide should begin where the user receives the daily reminder, because that is the true entry point for the flow.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for Slack prompt screenshot',
                caption: 'Replace this placeholder with the Slack prompt screenshot.',
            },
        },
        {
            title: 'Complete the requested update',
            body: 'Reuse the shared forms language for required answers, validation, and retry behavior if the submission is incomplete.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for Slack daily entry input screenshot',
                caption: 'Replace this placeholder with the daily entry input screenshot.',
            },
        },
        {
            title: 'Confirm the entry was recorded',
            body: 'End the guide with what success looks like in Slack and in the application so the flow has a clear finish.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for daily entry confirmation screenshot',
                caption: 'Replace this placeholder with the confirmation screenshot.',
            },
        },
    ],
};
