module.exports = {
    key: 'projects.managing-project-members.delete-member',
    title: 'Delete a member from a project',
    summary: 'End an Employee contributor relationship in a project.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.managing-project-members.delete-member',
    steps: [
        {
            title: 'Open the project and section',
            body: 'Click `Open project` in the desired project card and go to the Project Members section under the Teams Involved in the left column.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for project members section screenshot',
                caption: 'Replace this placeholder with the Project Members section screenshot.',
            },
        },
        {
            title: 'Click Delete on the member',
            body: 'Click on the `Delete` button in the Project Member to edit.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete project member screenshot',
                caption: 'Replace this placeholder with the delete project member screenshot.',
            },
        },
        {
            title: 'Confirm or cancel deletion',
            body: 'Confirm deletion by clicking the `Delete` button on the popup or cancel the process by clicking on the `Cancel` button.',
            image: {
                src: '/images/manuals/manual-image-required.svg',
                alt: 'Placeholder for delete project member confirmation screenshot',
                caption: 'Replace this placeholder with the delete confirmation screenshot.',
            },
        },
    ],
};
