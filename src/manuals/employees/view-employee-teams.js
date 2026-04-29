module.exports = {
    key: 'employees.view-employee-teams',
    title: 'View employee teams',
    type: 'concept',
    status: 'complete',
    order: 40,
    summary: 'Understand the team list shown on employee profiles.',
    appliesTo: ['Employees', 'Teams'],
    helpKey: 'employees.view-employee-teams',
    sections: [
        {
            title: 'Team membership',
            body: 'The employee profile lists teams the employee is assigned to.',
            image: {
                src: '/images/manuals/employee/emp-teams1.webp',
                alt: 'Focus on the section "Your Teams" in the Employee Page.',
                caption: 'Your Teams section.',
            },
        },
        {
            title: 'Team links',
            body: 'Each team item links to the related team detail page.',
            image: {
                src: '/images/manuals/employee/emp-teams2.webp',
                alt: 'Focus over an item in the "Your Teams" section.',
                caption: 'Click over a Team to be redirected to its page.',
            },
        },
    ],
};
