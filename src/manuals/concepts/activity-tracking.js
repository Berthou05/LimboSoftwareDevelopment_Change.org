module.exports = {
    key: 'concepts.activity-tracking',
    title: 'How activity tracking works',
    type: 'concept',
    status: 'complete',
    order: 20,
    summary: 'Understand how activity entries appear across employees, teams, projects, and Home.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.activity-tracking',
    sections: [
        {
            title: 'What activity shows',
            body: 'Activity entries show completed work with a title, description, author, date, and time when that data is available.',
        },
        {
            title: 'Where activity appears',
            body: 'Employee pages show activity for that person. Team pages show activity from team members. Project pages show activity connected to the project.',
        },
        {
            title: 'Filtering activity',
            body: 'Activity lists can be filtered by presets such as today, week, month, quarter, or all. Some views also support a custom date range.',
        },
    ],
};
