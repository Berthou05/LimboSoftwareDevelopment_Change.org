module.exports = {
    key: 'concepts.slack-standups',
    title: 'Write standups the system can use',
    type: 'concept',
    status: 'draft',
    order: 50,
    summary: 'Format standups so each section has value for reports and activity review.',
    appliesTo: ['Slack', 'Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.slack-standups',
    sections: [
        {
            title: 'Use a consistent format',
            body: 'Keep the same sections every day so the system and reviewers can compare updates over time. Separate completed work, planned work, and blockers instead of mixing everything into one paragraph.',
        },
        {
            title: 'Completed work shows progress',
            body: 'Completed work explains what actually moved forward. It helps employee reports describe contribution, helps project reports show progress, and gives leads a reliable record of what changed during the period.',
        },
        {
            title: 'Planned work shows intent',
            body: 'Planned work explains what should happen next. It helps leads detect whether work is aligned with current goals and makes the next standup easier to evaluate because there is a clear expectation to compare against.',
        },
        {
            title: 'Blockers show what needs help',
            body: 'Blockers should name the obstacle and the next action needed. This makes the update useful for follow-up instead of only saying work is delayed.',
        },
        {
            title: 'Project context keeps reports accurate',
            body: 'Mention the project when the activity changes context or could be ambiguous. Clear project context helps reports connect employee work to the right project and avoids mixing unrelated updates together.',
        },
    ],
};
