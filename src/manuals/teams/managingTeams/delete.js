module.exports = {
    key: 'teams.managing-teams.delete',
    title: 'Delete a team',
    summary: 'Disable a team from the directory using the delete confirmation flow available to the team lead.',
    appliesTo: ['Teams'],
    helpKey: 'teams.managing-teams.delete',
    steps: [
        {
            title: 'Locate the team delete action',
            body: 'From the Teams directory, find the team card where you have permission to delete the team.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete team action screenshot',
                caption: 'Replace this placeholder with the delete team action screenshot.',
            },
        },
        {
            title: 'Open the delete confirmation popup',
            body: 'Use the Delete button to open the confirmation popup and review the warning before continuing.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete team popup screenshot',
                caption: 'Replace this placeholder with the delete team popup screenshot.',
            },
        },
        {
            title: 'Confirm or cancel the deletion',
            body: 'Click Delete to disable the team, or Cancel to keep it unchanged.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for team delete confirmation screenshot',
                caption: 'Replace this placeholder with the team delete confirmation screenshot.',
            },
        },
    ],
};
