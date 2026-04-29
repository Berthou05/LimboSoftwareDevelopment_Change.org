module.exports = {
    key: 'projects.managing-project-members.add-member',
    title: 'Add a member to a project',
    summary: 'Add an Employee as a contributor to a Project.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.managing-project-members.add-member',
    steps: [
        {
            title: 'Open the project',
            body: 'Click `Open project` in the desired project card to add an Employee.',
            image: {
                src: '/images/manuals/projects/add-member1.webp',
                alt: 'Focus on the "Open project" button over a Project Card.',
                caption: 'Focus on the "Open project" button over a Project Card to access its page.',
            },
        },
        {
            title: 'Go to Project Members',
            body: 'Go to the Project Members section under the Teams Involved in the left column.',
            image: {
                src: '/images/manuals/projects/add-member2.webp',
                alt: 'Focus on the "Project Members" section of the Project.',
                caption: 'Locate the "Project Members" section.',
            },
        },
        {
            title: 'Click Add',
            body: 'Click on the `Add` button in the upper right corner of the Project Members section.',
            image: {
                src: '/images/manuals/projects/add-member3.webp',
                alt: 'Focus on the Add button located in the superior right corner of the section.',
                caption: 'Click the "Add" button.',
            },
        },
        {
            title: 'Select the employee and role',
            body: 'Choose an Employee in the dropdown menu or search for its name in the search bar. Add a Role for the Employee in the Project.',
            image: {
                src: '/images/manuals/projects/add-member4.webp',
                alt: 'Focus on the dropdown to select an active employee and an input to type his/her role.',
                caption: 'Complete the required fields: member selection and role.',
            },
        },
        {
            title: 'Add the employee to the project',
            body: 'Click the `Add to Project` button.',
            image: {
                src: '/images/manuals/projects/add-member5.webp',
                alt: 'Focus on the "Add to Project" button behind the input fields.',
                caption: 'Click on the "Add to Project" button to add an Employee to a Project.',
            },
        },
    ],
};
