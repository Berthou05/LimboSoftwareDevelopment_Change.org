module.exports = {
    key: 'employees.view-employee-projects',
    title: 'View employee projects',
    type: 'concept',
    status: 'complete',
    order: 20,
    summary: 'Understand the project list shown on employee profiles.',
    appliesTo: ['Employees', 'Projects'],
    helpKey: 'employees.view-employee-projects',
    sections: [
        {
            title: 'Project membership',
            body: 'The employee profile lists projects the employee contributes to.',
            image: {
                src: '/images/manuals/employee/emp-projects1.webp',
                alt: 'Focus on the section "Your Projects" in the Employee Page.',
                caption: 'Your Projects section.',
            },
        },
        {
            title: 'Project links',
            body: 'Each project item links to the related project detail page.',
            image: {
                src: '/images/manuals/employee/emp-projects2.webp',
                alt: 'Focus over an item in the "Your Projects" section.',
                caption: 'Click over a Project to be redirected to its page.',
            },
        },
    ],
};
