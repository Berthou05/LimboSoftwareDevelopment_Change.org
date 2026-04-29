module.exports = {
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
                src: '/images/manuals/projects/create-project1.webp',
                alt: 'Project page with all available projects',
                caption: 'Start from the Project page before creating a new project.',
            },
        },
        {
            title: 'Click Create project',
            body: 'Click on the `Create project` button in the upper right corner.',
            image: {
                src: '/images/manuals/projects/create-project2.webp',
                alt: 'Create project button',
                caption: 'Use the create action in the upper right corner.',
            },
        },
        {
            title: 'Fill the New Project form',
            body: 'Fill the `New Project` form. Only Name and Start Date are required fields.',
            image: {
                src: '/images/manuals/projects/create-project3.webp',
                alt: 'New Project form',
                caption: 'Name and Start Date are the only required fields.',
            },
        },
        {
            title: 'Review or cancel the form',
            body: 'You can edit the fields later. Click on the `Cancel` button anytime you want to cancel the process.',
            image: {
                src: '/images/manuals/projects/create-project4.webp',
                alt: 'New Project form with cancel button',
                caption: 'Cancel closes the process without creating the project.',
            },
        },
        {
            title: 'Create the project',
            body: 'Click on the `Create Project` button. You will be sent to the Projects page and your new project will be available in `My Projects` section.',
            image: {
                src: '/images/manuals/projects/create-project5.webp',
                alt: 'Created project in My Projects section',
                caption: 'After saving, the project appears in My Projects.',
            },
        },
    ],
};
