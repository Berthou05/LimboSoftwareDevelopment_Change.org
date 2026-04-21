module.exports = {
    key: 'projects.managing-projects',
    title: 'Managing projects',
    summary: 'Create, edit, delete, join, or leave projects from the Project module.',
    appliesTo: ['Projects'],
    helpKey: 'projects.managing-projects',
    children: [
        {
            key: 'projects.managing-projects.create',
            title: 'Create a project',
            summary: 'Create a project you are responsible for and reference your activities to it in the Project module.',
            appliesTo: ['Projects'],
            helpKey: 'projects.managing-projects.create',
            steps: [
                {
                    title: 'Open the Project page',
                    body: 'Go to the Project page where all available projects are present.',
                    image: {
                        src: '/images/manuals/Projects/create-project1.webp',
                        alt: 'Project page with all available projects',
                        caption: 'Start from the Project page before creating a new project.',
                    },
                },
                {
                    title: 'Click Create Project',
                    body: 'Click on the `Create Project` button in the upper right corner.',
                    image: {
                        src: '/images/manuals/Projects/create-project2.webp',
                        alt: 'Create Project button',
                        caption: 'Use the create action in the upper right corner.',
                    },
                },
                {
                    title: 'Fill the New Project form',
                    body: 'Fill the `New Project` form. Only Name and Start Date are required fields.',
                    image: {
                        src: '/images/manuals/Projects/create-project3.webp',
                        alt: 'New Project form',
                        caption: 'Name and Start Date are the only required fields.',
                    },
                },
                {
                    title: 'Review or cancel the form',
                    body: 'You can edit the fields later. Click on the `Cancel` button anytime you want to cancel the process.',
                    image: {
                        src: '/images/manuals/Projects/create-project4.webp',
                        alt: 'New Project form with cancel button',
                        caption: 'Cancel closes the process without creating the project.',
                    },
                },
                {
                    title: 'Create the project',
                    body: 'Click on the `Create Project` button. You will be sent to the Projects page and your new project will be available in `My Projects` section.',
                    image: {
                        src: '/images/manuals/Projects/create-project5.webp',
                        alt: 'Created project in My Projects section',
                        caption: 'After saving, the project appears in My Projects.',
                    },
                },
            ],
        },
        {
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
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for open project screenshot',
                        caption: 'Replace this placeholder with the project card screenshot.',
                    },
                },
                {
                    title: 'Click Edit',
                    body: 'Inside your project, in the project information card click the button `Edit`.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for project edit button screenshot',
                        caption: 'Replace this placeholder with the project information edit screenshot.',
                    },
                },
                {
                    title: 'Fill the edition form',
                    body: 'Fill the edition form. Only Name and Start Date are required fields. Any information that is not modified will remain the same.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for edit form screenshot',
                        caption: 'Replace this placeholder with the edit form screenshot.',
                    },
                },
                {
                    title: 'Cancel if needed',
                    body: 'Click on the `Cancel` button anytime you want to cancel the process.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for edit cancel screenshot',
                        caption: 'Replace this placeholder with the cancel action screenshot.',
                    },
                },
                {
                    title: 'Save the changes',
                    body: 'Click on the `Save` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for save project screenshot',
                        caption: 'Replace this placeholder with the save button screenshot.',
                    },
                },
            ],
        },
        {
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
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for project delete button screenshot',
                        caption: 'Replace this placeholder with the delete button screenshot.',
                    },
                },
                {
                    title: 'Confirm or cancel deletion',
                    body: 'Confirm deletion by clicking the `Delete` button on the popup or cancel the process by clicking on the `Cancel` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for delete confirmation popup screenshot',
                        caption: 'Replace this placeholder with the delete confirmation popup screenshot.',
                    },
                },
            ],
        },
        {
            key: 'projects.managing-projects.join',
            title: 'Join a project',
            summary: 'Join a project from the project details page.',
            appliesTo: ['Projects'],
            helpKey: 'projects.managing-projects.join',
            steps: [
                {
                    title: 'Open the project',
                    body: 'Click `Open project` in the desired project card.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for open project screenshot',
                        caption: 'Replace this placeholder with the project card screenshot.',
                    },
                },
                {
                    title: 'Click Join Project',
                    body: 'Click the `Join Project` button on the upper right corner of the page.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for join project screenshot',
                        caption: 'Replace this placeholder with the join project screenshot.',
                    },
                },
            ],
        },
        {
            key: 'projects.managing-projects.leave',
            title: 'Leave a project',
            summary: 'Leave a project from the project details page.',
            appliesTo: ['Projects'],
            helpKey: 'projects.managing-projects.leave',
            steps: [
                {
                    title: 'Open the project',
                    body: 'Click `Open project` in the desired project card.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for open project screenshot',
                        caption: 'Replace this placeholder with the project card screenshot.',
                    },
                },
                {
                    title: 'Click Leave Project',
                    body: 'Click the `Leave Project` button on the upper right corner of the page.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for leave project screenshot',
                        caption: 'Replace this placeholder with the leave project screenshot.',
                    },
                },
            ],
        },
    ],
};
