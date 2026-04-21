module.exports = {
    key: 'employees',
    title: 'Employees',
    description: 'Guides for browsing the employee directory and reviewing employee details.',
    entries: [
        {
            key: 'employees.browse-employees',
            title: 'Browse employees',
            summary: 'Search and filter employees from the employee directory.',
            appliesTo: ['Employees'],
            helpKey: 'employees.browse-employees',
            steps: [
                {
                    title: 'Open the employee directory',
                    body: 'Go to the Employees module to browse all visible employees.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee directory screenshot',
                        caption: 'Replace this placeholder with the employee directory screenshot.',
                    },
                },
                {
                    title: 'Use the search or filters',
                    body: 'Apply the available search controls to narrow the list before opening an employee.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee search screenshot',
                        caption: 'Replace this placeholder with the employee search screenshot.',
                    },
                },
                {
                    title: 'Open the employee record',
                    body: 'Select the employee card or row you want to review in more detail.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee card screenshot',
                        caption: 'Replace this placeholder with the employee card screenshot.',
                    },
                },
            ],
        },
        {
            key: 'employees.view-employee-details',
            title: 'View employee details',
            summary: 'Review the employee profile, participation, and related information.',
            appliesTo: ['Employees'],
            helpKey: 'employees.view-employee-details',
            steps: [
                {
                    title: 'Open the employee details page',
                    body: 'Access an employee from the directory to review their detailed information.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee details screenshot',
                        caption: 'Replace this placeholder with the employee details screenshot.',
                    },
                },
                {
                    title: 'Review profile information',
                    body: 'Read the available employee information such as name, team relationships, and related participation.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee profile screenshot',
                        caption: 'Replace this placeholder with the employee profile screenshot.',
                    },
                },
                {
                    title: 'Follow related links when needed',
                    body: 'Open the associated project or team when you need to continue the workflow outside the employee profile.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for employee related links screenshot',
                        caption: 'Replace this placeholder with the related links screenshot.',
                    },
                },
            ],
        },
    ],
};
