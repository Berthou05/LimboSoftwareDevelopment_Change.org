module.exports = {
    key: 'quick-start.submit-daily-standup',
    title: 'Submit a daily standup',
    summary: 'Use this guide to help a new user answer the Slack standup prompt and confirm that the entry was recorded correctly.',
    appliesTo: ['Slack standups', 'Quick Start'],
    helpKey: 'quick-start.submit-daily-standup',
    steps: [
        {
            title: 'Start from the Slack reminder',
            body: 'Open the standup prompt from Slack because that is the normal starting point for a daily update.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for daily standup reminder screenshot',
                caption: 'Replace this placeholder with the Slack reminder screenshot.',
            },
        },
        {
            title: 'Answer the standup questions',
            body: 'Complete the requested update with enough detail to describe progress, blockers, and next actions before submitting.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for standup submission screenshot',
                caption: 'Replace this placeholder with the standup form screenshot.',
            },
        },
        {
            title: 'Check that the update was recorded',
            body: 'Confirm the submission succeeded in Slack and, when needed, verify the daily entry inside the application.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for recorded daily entry screenshot',
                caption: 'Replace this placeholder with the confirmation screenshot.',
            },
        },
    ],
};
