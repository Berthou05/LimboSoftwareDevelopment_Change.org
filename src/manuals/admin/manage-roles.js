module.exports = {
    key: 'admin.manage-roles',
    title: 'Manage roles',
    type: 'workflow',
    status: 'complete',
    order: 20,
    summary: 'Create and delete roles from Roles Administration.',
    appliesTo: ['Admin'],
    helpKey: 'admin.manage-roles',
    sections: [
        {
            title: 'Create a role',
            body: 'Click `Create Role`, enter the role name, and submit the popup.',
        },
        {
            title: 'Delete a role',
            body: 'Use the delete action on a role column and confirm the popup.',
        },
        {
            title: 'Required privileges',
            body: 'Creating roles requires `ADMIN-02`. Deleting roles requires `ADMIN-03`.',
        },
    ],
};
