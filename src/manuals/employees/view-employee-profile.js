module.exports = {
    key: 'employees.view-employee-profile',
    title: 'View employee profile',
    type: 'tutorial',
    status: 'complete',
    order: 10,
    summary: 'Open an employee profile to view contact details, activity, teams, projects, and reports.',
    appliesTo: ['Employees'],
    helpKey: 'employees.view-employee-profile',
    steps: [
        { 
            title: 'Open Employees', 
            body: 'Open the Employees page.',
            image: {
                src: '/images/manuals/employee/emp-profile1.webp',
                alt: 'Show of the Employee navigation option on the sidebar.',
                caption: 'Access to the Employee page using the sidebar.',
            },
        },
        { 
            title: 'Search or browse', 
            body: 'Use the employee directory search or browse the visible employee cards.',
            image: {
                src: '/images/manuals/employee/emp-profile2.webp',
                alt: 'Focus on the seach bar and obtained results of the Employee Directory page.',
                caption: 'Searchbar and directory is only available for users above the Employee role.',
            },
        }
    ],
};
