module.exports = {
    key: 'concepts.activity-tracking',
    title: 'Use activity tracking effectively',
    type: 'concept',
    status: 'complete',
    order: 20,
    summary: 'Review activity from the right context and keep entries easy to find later.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.activity-tracking',
    sections: [
        {
            title: 'Choose the narrowest useful view',
            body: 'Use an employee profile for one person, a project page for one project, and a team page for the group. This keeps activity review focused and avoids scanning unrelated updates.',
            image: {
                src: '/images/manuals/concepts/activity-tracking1.webp',
                alt: 'Focus on the Employee, Team and Employee labels in the sidebar. Choose the focus you prefer to check and visuallize activities.',
                caption: 'Choose the section you prefer to visuallize activies clearly.',
            },
        },
        {
            title: 'Filter before you read',
            body: 'Start with week or month filters for normal review. Use today for quick check-ins, quarter for broader summaries, and all only when you need historical context.',
            image: {
                src: '/images/manuals/concepts/activity-tracking2.webp',
                alt: 'Project page showing the filers of the activities section.',
                caption: 'Available filters: Today, Week, Month, Quarter, All.',
            },
        },
        {
            title: 'Keep project links clean',
            body: 'On your own employee profile, use `Change project` when an activity is attached to the wrong project. Good project links make project reports and project activity easier to trust.',
            image: {
                src: '/images/manuals/concepts/activity-tracking3.webp',
                alt: 'Popup allowing to change the chosen activity to anothe project.',
                caption: 'Change project allows manual project assignation to the chosen activity.',
            },
        },
    ],
};
