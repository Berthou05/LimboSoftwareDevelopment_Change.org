module.exports = {
    key: 'teams.view-team-activity',
    title: 'View team activity',
    type: 'workflow',
    status: 'complete',
    order: 50,
    summary: 'Review activity from employees connected to a team.',
    appliesTo: ['Teams', 'Home'],
    helpKey: 'teams.view-team-activity',
    sections: [
        {
            title: 'Activity source',
            body: 'The team activity list shows activity from team members.',
        },
        {
            title: 'Filter activity',
            body: 'Use date presets or custom dates to narrow the activity list.',
        },
        {
            title: 'Empty results',
            body: 'If no activity matches the selected period, the activity panel displays an empty state.',
        },
    ],
};
