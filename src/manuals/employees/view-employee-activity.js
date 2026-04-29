module.exports = {
    key: 'employees.view-employee-activity',
    title: 'View employee activity',
    type: 'workflow',
    status: 'complete',
    order: 30,
    summary: 'Filter and review activity entries on an employee profile.',
    appliesTo: ['Employees', 'Home', 'Projects'],
    helpKey: 'employees.view-employee-activity',
    sections: [
        {
            title: 'Activity filters',
            body: 'Use today, week, month, quarter, or all filters to change the visible activity period.',   
            image: {
                src: '/images/manuals/employee/emp-activity1.webp',
                alt: 'Focus on the available filters for "Your Activity" in the employee page: Today, Week, Month, Quarter, All.',
                caption: 'Use the available filters Today, Week, Month, Quarter, All to change activities visibility.',
            },
        },
        {
            title: 'Project filter',
            body: 'Use the project selector to show all activity or only activity connected to one project.',
            image: {
                src: '/images/manuals/employee/emp-activity2.webp',
                alt: 'Focus on the open projects selector of the "Your Activity" section in the Employee page.',
                caption: 'Filter by project using the dropdown project selector.',
            },
        },
        {
            title: 'Change activity project',
            body: 'On your own profile, use `Change project` to connect an activity entry to a different project or remove the project connection.',
            image: {
                src: '/images/manuals/employee/emp-activity3.webp',
                alt: 'Popup allowing to change the chosen activity to anothe project.',
                caption: 'Change project allows manual project assignation to the chosen activity.',
            },
        },
    ],
};
