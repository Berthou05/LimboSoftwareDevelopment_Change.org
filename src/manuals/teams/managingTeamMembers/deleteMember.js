module.exports = {
    key: 'teams.managing-team-members.delete-member',
    title: 'Remove a member from a team',
    summary: 'Remove a participant from the team when they should no longer belong to it.',
    appliesTo: ['Teams', 'Employees'],
    helpKey: 'teams.managing-team-members.delete-member',
    steps: [
        {
            title: 'Open the team participants list',
            body: 'Open the team where the member currently belongs and locate them in the Team Participants panel.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for team participants member list screenshot',
                caption: 'Replace this placeholder with the team participants member list screenshot.',
            },
        },
        {
            title: 'Use the Remove action',
            body: 'Hover the member row and click Remove to open the confirmation popup.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for remove team member action screenshot',
                caption: 'Replace this placeholder with the remove team member action screenshot.',
            },
        },
        {
            title: 'Confirm the removal',
            body: 'Confirm the action so the member is removed from the team participants list.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for confirm remove team member screenshot',
                caption: 'Replace this placeholder with the confirm remove team member screenshot.',
            },
        },
    ],
};
