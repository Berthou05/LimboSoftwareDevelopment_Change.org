module.exports = {
    key: 'projects.managing-project-teams',
    title: 'Managing project teams',
    summary: 'Add, edit, or remove team relationships inside a project.',
    appliesTo: ['Projects', 'Teams'],
    helpKey: 'projects.managing-project-teams',
    children: [
        {
            key: 'projects.managing-project-teams.add-team',
            title: 'Add a team to a project',
            summary: 'Add a Team as a contributor to a project.',
            appliesTo: ['Projects', 'Teams'],
            helpKey: 'projects.managing-project-teams.add-team',
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
                    title: 'Go to Teams Involved',
                    body: 'Go to the Teams Involved section under the Report Generator in the left column.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for teams involved section screenshot',
                        caption: 'Replace this placeholder with the Teams Involved section screenshot.',
                    },
                },
                {
                    title: 'Click Add',
                    body: 'Click on the `Add` button in the upper right corner of the Teams Involved section.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for add team button screenshot',
                        caption: 'Replace this placeholder with the add team button screenshot.',
                    },
                },
                {
                    title: 'Select the team and description',
                    body: 'Choose a Team in the dropdown menu or search for its name in the search bar. Add a Description for the Team relationship to the Project.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team selector screenshot',
                        caption: 'Replace this placeholder with the team selector screenshot.',
                    },
                },
                {
                    title: 'Add the team to the project',
                    body: 'Click the `Add to Project` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for add to project screenshot',
                        caption: 'Replace this placeholder with the add to project screenshot.',
                    },
                },
            ],
        },
        {
            key: 'projects.managing-project-teams.edit-team',
            title: 'Edit the team relationship to a project',
            summary: 'Edit a Team relationship to a project.',
            appliesTo: ['Projects', 'Teams'],
            helpKey: 'projects.managing-project-teams.edit-team',
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
                    title: 'Click Edit on the team',
                    body: 'Click on the `Edit` button in the Team Involved to edit.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for edit team relationship screenshot',
                        caption: 'Replace this placeholder with the edit relationship screenshot.',
                    },
                },
                {
                    title: 'Update the description',
                    body: 'Type a Description for the Team in the emergent popup. Click on the `Cancel` button anytime you want to cancel the process.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team description popup screenshot',
                        caption: 'Replace this placeholder with the team description popup screenshot.',
                    },
                },
                {
                    title: 'Save the description',
                    body: 'Click the `Save Description` button.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for save description screenshot',
                        caption: 'Replace this placeholder with the save description screenshot.',
                    },
                },
            ],
        },
        {
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
        },
    ],
};
