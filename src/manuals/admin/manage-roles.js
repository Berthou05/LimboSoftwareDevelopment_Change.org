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
            title: 'Open Roles Administration',
            body: 'Open de Roles Administration page.',
            image: {
                src: '/images/manuals/admin/manage-roles1.webp',
                alt: 'Show of the Roles Administration navigation option on the sidebar.',
                caption: 'Roles Administration is available for ADMIN on the sidebar.',
            }, 
        },
        {
            title: 'Create a role',
            body: 'Click `Create Role`, enter the role name, and submit the popup.',
            image: {
                src: '/images/manuals/admin/manage-roles2.webp',
                alt: 'Focus on the Create Role button at the top right corner of the page.',
                caption: 'Click on the Create Role button.',
            }, 
        },
        {
            title: 'Delete a role',
            body: 'Use the delete action on a role column and confirm the popup.',
            image: {
                src: '/images/manuals/admin/manage-roles3.webp',
                alt: 'Show of the Accounts Administration navigation option on the sidebar. A table whose columns are roles, rows are privileges and toggles are in each intersection.',
                caption: 'Accounts Administration is available for ADMIN on the sidebar.',
            }, 
        },
        {
            title: 'Required privileges',
            body: 'Creating roles requires `ADMIN-02`. Deleting roles requires `ADMIN-03`.',
            image: {
                src: '/images/manuals/admin/manage-roles4.webp',
                alt: 'Show of the Accounts Administration navigation option on the sidebar. A table whose columns are roles, rows are privileges and toggles are in each intersection.',
                caption: 'Accounts Administration is available for ADMIN on the sidebar.',
            }, 
        },
    ],
};
