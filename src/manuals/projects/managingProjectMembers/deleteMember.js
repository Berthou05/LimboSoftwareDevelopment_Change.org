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
                src: '/images/manuals/projects/delete-member1.webp',
                alt: 'Focus on the "Project Members" section of the Project.',
                caption: 'Locate the "Project Members" section in the selected Project.',
            },
        },
        {
            title: 'Click Delete on the member',
            body: 'Click on the `Delete` button in the Project Member to edit.',
            image: {
                src: '/images/manuals/projects/delete-member2.webp',
                alt: 'Focus on the Delete button located in the right side of the chosen member.',
                caption: 'Click the "Delete" button.',
            },
        },
        {
            title: 'Confirm or cancel deletion',
            body: 'Confirm deletion by clicking the `Delete` button on the popup or cancel the process by clicking on the `Cancel` button.',
            image: {
                src: '/images/manuals/projects/delete-member3.webp',
                alt: 'Focus on the emergent confirmation popup once the button has been pressed.',
                caption: 'Confirm your selection in the emergent popup.',
            },
        },
    ],
};
