module.exports = {
    key: 'projects.managing-projects.edit',
    title: 'Edit a project',
    summary: 'Be able to edit the information related to your project.',
    appliesTo: ['Projects'],
    helpKey: 'projects.managing-projects.edit',
    steps: [
        {
            title: 'Open the project',
            body: 'Click `Open project` in the desired project card.',
            image: {
                src: '/images/manuals/projects/edit-project1.webp',
                alt: 'Open project action in the project card',
                caption: 'Open the project you want to edit from the project directory.',
            },
        },
        {
            title: 'Click Edit',
            body: 'Inside your project, in the project information card click the button `Edit`.',
            image: {
                src: '/images/manuals/projects/edit-project2.webp',
                alt: 'Project information card with edit action',
                caption: 'Use the edit action from the project information card.',
            },
        },
        {
            title: 'Fill the edition form',
            body: 'Fill the edition form. Only Name and Start Date are required fields. Any information that is not modified will remain the same.',
            image: {
                src: '/images/manuals/projects/edit-project3.webp',
                alt: 'Project edit form',
                caption: 'Update the project information in the edit form.',
            },
        },
        {
            title: 'Cancel if needed',
            body: 'Click on the `Cancel` button anytime you want to cancel the process.',
            image: {
                src: '/images/manuals/projects/edit-project4.webp',
                alt: 'Project edit form with cancel action',
                caption: 'Cancel closes the edit flow without applying changes.',
            },
        },
        {
            title: 'Save the changes',
            body: 'Click on the `Save` button.',
            image: {
                src: '/images/manuals/projects/edit-project5.webp',
                alt: 'Save changes in the project edit flow',
                caption: 'Save the updated project information to apply the changes.',
            },
        },
    ],
};
