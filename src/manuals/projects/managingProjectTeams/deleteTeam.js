module.exports = {
    key: 'projects.managing-project-teams.delete-team',
    title: 'Delete a team from a project',
    summary: 'End a Team contributor relationship in a project.',
    appliesTo: ['Projects', 'Teams'],
    helpKey: 'projects.managing-project-teams.delete-team',
    steps: [
        {
            title: 'Open the project and section',
            body: 'Click `Open project` in the desired project card and go to the Teams Involved section under the Report Generator in the left column.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for teams involved section screenshot',
                caption: 'Replace this placeholder with the Teams Involved section screenshot.',
            },
        },
        {
            title: 'Click Delete on the team',
            body: 'Click on the `Delete` button in the Team Involved to edit.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete team relationship screenshot',
                caption: 'Replace this placeholder with the delete relationship screenshot.',
            },
        },
        {
            title: 'Confirm or cancel deletion',
            body: 'Confirm deletion by clicking the `Delete` button on the popup or cancel the process by clicking on the `Cancel` button.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete team confirmation screenshot',
                caption: 'Replace this placeholder with the delete confirmation screenshot.',
            },
        },
    ],
};
