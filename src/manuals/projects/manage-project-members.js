module.exports = {
    key: 'projects.manage-project-members',
    title: 'Manage project members',
    type: 'workflow',
    status: 'complete',
    order: 50,
    summary: 'Add employees to a project, update their project role, or remove them.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.manage-project-members',
    sections: [
        {
            title: 'Add a member',
            body: 'Use the Project Members panel to select an employee and enter the role they will have in the project.',
        },
        {
            title: 'Update a member role',
            body: 'Use the member role edit action. Project roles are free-text labels and can be up to 150 characters.',
        },
        {
            title: 'Remove a member',
            body: 'Use the remove action for a project member. The responsible project lead cannot be removed through this action.',
        },
        {
            title: 'Required privileges',
            body: 'Adding project members requires the `PROJ-05-02` privilege. Updating or removing project members requires the `PROJ-06-02` privilege.',
        },
    ],
};
