module.exports = {
    key: 'teams',
    title: 'Teams',
    description: 'Guides for creating teams, managing team membership, and connecting teams to projects.',
    entries: [
        {
            key: 'teams.managing-teams',
            title: 'Managing teams',
            summary: 'Create, edit, and manage core team information from the Teams module.',
            appliesTo: ['Teams'],
            helpKey: 'teams.managing-teams',
            steps: [
                {
                    title: 'Open the Teams module',
                    body: 'Go to the Teams page to browse available teams and start a new team workflow.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for teams directory screenshot',
                        caption: 'Replace this placeholder with the teams directory screenshot.',
                    },
                },
                {
                    title: 'Choose the team action',
                    body: 'Use the team card actions or the create action depending on whether you want to create a new team or update an existing one.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team actions screenshot',
                        caption: 'Replace this placeholder with the team actions screenshot.',
                    },
                },
                {
                    title: 'Review the team information',
                    body: 'Check the team name, description, image, and current status before saving changes.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team information screenshot',
                        caption: 'Replace this placeholder with the team information screenshot.',
                    },
                },
            ],
        },
        {
            key: 'teams.managing-team-members',
            title: 'Managing team members',
            summary: 'Add, edit, or remove employees from a team.',
            appliesTo: ['Teams', 'Employees'],
            helpKey: 'teams.managing-team-members',
            steps: [
                {
                    title: 'Open the team details',
                    body: 'Start from the Teams page and open the team where the membership change should happen.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team details screenshot',
                        caption: 'Replace this placeholder with the team details screenshot.',
                    },
                },
                {
                    title: 'Use the member controls',
                    body: 'Select the add, edit, or remove action in the participants area depending on the change you need.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team member controls screenshot',
                        caption: 'Replace this placeholder with the team member controls screenshot.',
                    },
                },
                {
                    title: 'Confirm the updated roster',
                    body: 'Review the participant list after saving so the team roster reflects the expected relationship.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for updated team roster screenshot',
                        caption: 'Replace this placeholder with the updated team roster screenshot.',
                    },
                },
            ],
        },
        {
            key: 'teams.managing-team-projects',
            title: 'Managing team projects',
            summary: 'Review and manage the projects associated with a team.',
            appliesTo: ['Teams', 'Projects'],
            helpKey: 'teams.managing-team-projects',
            steps: [
                {
                    title: 'Open the team details',
                    body: 'Open the team from the Teams module to review the projects currently associated with that team.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team details screenshot',
                        caption: 'Replace this placeholder with the team details screenshot.',
                    },
                },
                {
                    title: 'Review the project list',
                    body: 'Use the team projects area to understand which projects the team is currently contributing to.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for team projects list screenshot',
                        caption: 'Replace this placeholder with the team projects list screenshot.',
                    },
                },
                {
                    title: 'Open the related project when needed',
                    body: 'Move into the project details page when the project relationship requires changes or deeper review.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for related project link screenshot',
                        caption: 'Replace this placeholder with the related project link screenshot.',
                    },
                },
            ],
        },
    ],
};
