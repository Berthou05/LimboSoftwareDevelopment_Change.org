module.exports = {
    key: 'concepts.slack-standups',
    title: 'Write standups the system can use',
    type: 'concept',
    status: 'draft',
    order: 50,
    summary: 'Write Slack standups that are convenient for you and useful later in the app.',
    appliesTo: ['Slack', 'Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.slack-standups',
    sections: [
        {
            title: 'Write one clear activity per line',
            body: 'Use short lines that describe completed work. A line like `Finished login validation` is easier to review later than a long paragraph with several unrelated updates.',
            image: {
                src: '/images/manuals/concepts/slack-standups1.webp',
                alt: '.',
                caption: '".',
            },
        },
        {
            title: 'Mention the project only when it changes context',
            body: 'You should not need to repeat the project title for every activity. Group related lines together and mention the project once when the next few lines belong to the same project.',
            image: {
                src: '/images/manuals/concepts/slack-standups2.webp',
                alt: '.',
                caption: '".',
            },
        },
        {
            title: 'Make blockers actionable',
            body: 'Write blockers as the next action you need from someone else, such as `Need approval for the report date range`, instead of only saying that you are blocked.',
            image: {
                src: '/images/manuals/concepts/slack-standups3.webp',
                alt: '.',
                caption: '".',
            },
        },
    ],
};
