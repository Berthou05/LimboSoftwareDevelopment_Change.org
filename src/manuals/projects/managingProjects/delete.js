module.exports = {
    key: 'projects.managing-projects.delete',
    title: 'Delete a project',
    summary: 'Delete a project you created.',
    appliesTo: ['Projects'],
    helpKey: 'projects.managing-projects.delete',
    steps: [
        {
            title: 'Open the delete action',
            body: 'Click on the `Delete` button available in the upper right corner of the project to delete.',
            image: {
                src: '/images/manuals/projects/delete-project1.webp',
                alt: 'Focus on the "Delete" button at the top right corner of the Project card in Project Directory',
                caption: 'The "Delete" button is only available for those projects created by the user.',
            },
        },
        {
            title: 'Confirm or cancel deletion',
            body: 'Confirm deletion by clicking the `Delete` button on the popup or cancel the process by clicking on the `Cancel` button.',
            image: {
                src: '/images/manuals/projects/delete-project2.webp',
                alt: 'Emergent confirmation popup to confirm or cancel the deletion process.',
                caption: 'Click on the "Delete" button tp complete the process, or "Cancel".',
            },
        },
    ],
};
