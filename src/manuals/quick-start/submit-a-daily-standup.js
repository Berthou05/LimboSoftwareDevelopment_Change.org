module.exports = {
    key: 'quick-start.submit-a-daily-standup',
    title: 'Submit a daily standup',
    type: 'tutorial',
    status: 'draft',
    order: 20,
    summary: 'Send a daily standup through Slack so the system can record your activity.',
    appliesTo: ['Slack', 'Home', 'Employees', 'Projects', 'Teams'],
    helpKey: 'quick-start.submit-a-daily-standup',
    steps: [
        {
            title: 'Open the Slack standup prompt',
            body: 'Use the Slack standup message sent to your workspace.',
        },
        {
            title: 'Write your update',
            body: 'Include what you planned, what you completed, and any blockers. Keep each item clear enough to be reused as activity data.',
        },
        {
            title: 'Submit the standup',
            body: 'Send the standup in Slack. The webhook receives the entry and connects it to your employee record when your Slack user is known.',
        },
    ],
};
