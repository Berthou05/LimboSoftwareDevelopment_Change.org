module.exports = {
    key: 'teams.manage-team-members',
    title: 'Manage team members',
    type: 'workflow',
    status: 'complete',
    order: 40,
    summary: 'Add members, change roles, or remove members from a team.',
    appliesTo: ['Teams', 'Employees'],
    helpKey: 'teams.manage-team-members',
    sections: [
        {
            title: 'Add a member',
            body: 'Use the Team Participants panel to select an employee and choose a role.',
        },
        {
            title: 'Allowed roles',
            body: 'Team member roles are controlled values.',
            items: ['LEAD', 'EMPLOYEE'],
        },
        {
            title: 'Remove a member',
            body: 'Use the remove action for an active team member. The responsible team lead cannot be removed from the team.',
        },
        {
            title: 'Required privileges',
            body: 'Adding team members requires `TEAM-06-02`. Updating or removing team members requires `TEAM-07-02`.',
        },
    ],
};
