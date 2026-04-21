module.exports = {
    key: 'projects.managing-project-members',
    title: 'Managing project members',
    summary: 'Add, edit, or remove employee relationships inside a project.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.managing-project-members',
    children: [
        {
            key: 'projects.managing-project-members.add-member',
            title: 'Add a member to a project',
            summary: 'Add an Employee as a contributor to a Project.',
            appliesTo: ['Projects', 'Employees'],
            helpKey: 'projects.managing-project-members.add-member',
            steps: [
                {
                    title: 'Open the project',
                    body: 'Click `Open project` in the desired project card to add a Team.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for open project screenshot',
                        caption: 'Replace this placeholder with the project card screenshot.',
                    },
                },
                {
                    title: 'Go to Project Members',
                    body: 'Go to the Project Members section under the Teams Involved in the left column.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for project members section screenshot',
                        caption: 'Replace this placeholder with the Project Members section screenshot.',
                    },
                },
                {
                    title: 'Click Add',
                    body: 'Click on the `Add` button in the upper right corner of the Project Members section.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for add member button screenshot',
                        caption: 'Replace this placeholder with the add member button screenshot.',
                    },
                },
                {
                    title: 'Select the employee and role',
                    body: 'Choose an Employee in the dropdown menu or search for its name in the search bar. Add a Role for the Employee in the Project.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee selector screenshot',
                        caption: 'Replace this placeholder with the employee selector screenshot.',
                    },
                },
                {
                    title: 'Add the employee to the project',
                    body: 'Click the `Add to Project` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for add to project member screenshot',
                        caption: 'Replace this placeholder with the add to project screenshot.',
                    },
                },
            ],
        },
        {
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
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for project members section screenshot',
                        caption: 'Replace this placeholder with the Project Members section screenshot.',
                    },
                },
                {
                    title: 'Click Edit on the member',
                    body: 'Click on the `Edit` button in the Project Member to edit.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for edit project member screenshot',
                        caption: 'Replace this placeholder with the edit project member screenshot.',
                    },
                },
                {
                    title: 'Update the role',
                    body: 'Type a Role for the Employee in the emergent popup. Click on the `Cancel` button anytime you want to cancel the process.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for project member role popup screenshot',
                        caption: 'Replace this placeholder with the role popup screenshot.',
                    },
                },
                {
                    title: 'Save the role',
                    body: 'Click the `Save Role` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for save role screenshot',
                        caption: 'Replace this placeholder with the save role screenshot.',
                    },
                },
            ],
        },
        {
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
        },
    ],
};
