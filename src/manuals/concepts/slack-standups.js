module.exports = {
    key: 'concepts.slack-standups',
    title: 'How Slack standups connect to the system',
    type: 'concept',
    status: 'draft',
    order: 50,
    summary: 'Understand the Slack webhook flow that creates daily entries and activity data.',
    appliesTo: ['Slack', 'Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.slack-standups',
    sections: [
        {
            title: 'Slack is the entry point',
            body: 'The application exposes a Slack webhook route for daily standup submissions.',
        },
        {
            title: 'Employee matching',
            body: 'Standups depend on Slack user information matching an employee record. If matching data is missing, the entry may not appear where the user expects.',
        },
        {
            title: 'Draft status',
            body: 'This guide is marked draft because the visible Slack prompt experience is outside the application screens in this codebase.',
        },
    ],
};
