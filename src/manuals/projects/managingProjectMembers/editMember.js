module.exports = {
    key: 'projects.managing-project-members.edit-member',
    title: 'Edit the member relationship to a project',
    summary: 'Edit an Employee relationship to a Project.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.managing-project-members.edit-member',
    steps: [
        {
            title: 'Open the project and section',
            body: 'Click `Open project` in the desired project card and go to the Project Members section under the Teams Involved in the left column.',
            image: {
                src: '/images/manuals/projects/edit-member1.webp',
                alt: 'Focus on the "Project Members" section of the Project.',
                caption: 'Locate the "Project Members" section in the selected Project.',
            },
        },
        {
            title: 'Click Edit on the member',
            body: 'Click on the `Edit` button in the Project Member to edit.',
            image: {
                src: '/images/manuals/projects/edit-member2.webp',
                alt: 'Focus on the Edit button located in the right side of the chosen member.',
                caption: 'Click the "Edit" button.',
            },
        },
        {
            title: 'Update the role',
            body: 'Type a Role for the Employee in the emergent popup. Click on the `Cancel` button anytime you want to cancel the process.',
            image: {
                src: '/images/manuals/projects/edit-member3.webp',
                alt: 'Focus on the emergent popup to edit the Employee Role in the Project or Cancel the process.',
                caption: 'Proceed with the edition by writing a new Role for the Employee or Cancel the process',
            },
        },
        {
            title: 'Save the role',
            body: 'Click the `Save Role` button.',
            image: {
                src: '/images/manuals/projects/edit-member4.webp',
                alt: 'Focus on the "Save" button once the input fields have been filled.',
                caption: 'Once the Employee Role has been writen, click on the "Save" button.',
            },
        },
    ],
};
