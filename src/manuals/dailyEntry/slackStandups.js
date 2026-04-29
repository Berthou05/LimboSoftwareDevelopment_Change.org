const dailyEntries = require('./slackStandups');

module.exports = {
    key: 'slack-standups',
    title: 'Slack Standups',
    description: 'Guides for submitting and reviewing daily standup workflows from Slack.',
    entries: [
        dailyEntries,
        {
            key: 'slack-standups.submit-standup',
            title: 'Submit a standup',
            summary: 'Send your daily update through the Slack standup flow.',
            appliesTo: ['Slack Standups'],
            helpKey: 'slack-standups.submit-standup',
            steps: [
                {
                    title: 'Open the Slack reminder',
                    body: 'Start from the standup reminder in Slack so the update is tied to the expected daily workflow.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for Slack reminder screenshot',
                        caption: 'Replace this placeholder with the Slack reminder screenshot.',
                    },
                },
                {
                    title: 'Answer the standup questions',
                    body: 'Complete the update with progress, blockers, and next actions before sending it.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for standup answer screenshot',
                        caption: 'Replace this placeholder with the standup answer screenshot.',
                    },
                },
                {
                    title: 'Confirm the submission',
                    body: 'Make sure Slack confirms the standup was submitted and recorded.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for standup confirmation screenshot',
                        caption: 'Replace this placeholder with the standup confirmation screenshot.',
                    },
                },
            ],
        },
        {
            key: 'slack-standups.review-standup-flow',
            title: 'Review standup flow',
            summary: 'Understand where the standup begins, how the data is entered, and what completion looks like.',
            appliesTo: ['Slack Standups'],
            helpKey: 'slack-standups.review-standup-flow',
            steps: [
                {
                    title: 'Identify the entry point',
                    body: 'Review the Slack message or slash-command flow that starts the standup process.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for standup entry flow screenshot',
                        caption: 'Replace this placeholder with the standup entry flow screenshot.',
                    },
                },
                {
                    title: 'Follow the data input step',
                    body: 'Check how the standup answers are collected before the final submission.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for standup data input screenshot',
                        caption: 'Replace this placeholder with the standup data input screenshot.',
                    },
                },
                {
                    title: 'Review the recorded result',
                    body: 'Confirm how the system or Slack indicates that the standup was successfully recorded.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for recorded standup result screenshot',
                        caption: 'Replace this placeholder with the recorded standup result screenshot.',
                    },
                },
            ],
        },
        {
            key: 'slack-standups.resolve-issues',
            title: 'Resolve standup issues',
            summary: 'Review the most common reasons a standup might not be submitted as expected.',
            appliesTo: ['Slack Standups'],
            helpKey: 'slack-standups.resolve-issues',
            steps: [
                {
                    title: 'Check the required answers',
                    body: 'Make sure the standup includes the information required by the prompt before trying again.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for required answers screenshot',
                        caption: 'Replace this placeholder with the required answers screenshot.',
                    },
                },
                {
                    title: 'Retry the submission',
                    body: 'Send the standup again after fixing missing or invalid information.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for standup retry screenshot',
                        caption: 'Replace this placeholder with the standup retry screenshot.',
                    },
                },
                {
                    title: 'Verify the corrected result',
                    body: 'Confirm the retried submission now appears as expected in Slack or the application.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for corrected standup screenshot',
                        caption: 'Replace this placeholder with the corrected standup screenshot.',
                    },
                },
            ],
        },
    ],
};
