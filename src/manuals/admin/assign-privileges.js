module.exports = {
    key: 'admin.assign-privileges',
    title: 'Assign privileges',
    type: 'reference',
    status: 'complete',
    order: 30,
    summary: 'Use the role privilege matrix to turn privileges on or off.',
    appliesTo: ['Admin'],
    helpKey: 'admin.assign-privileges',
    sections: [
        {
            title: 'Privilege matrix',
            body: 'Rows are privileges and columns are roles. Each cell shows whether the role has that privilege.',
            image: {
                src: '/images/manuals/admin/assign-privilege1.webp',
                alt: 'General view of the Role Administration page. A table whose columns are roles, rows are privileges and toggles are in each intersection.',
                caption: 'Privilege Matrix of the Role Administration Page.',
            },
        },
        {
            title: 'Toggle behavior',
            body: 'Click `ON` or `OFF` to change the selected privilege for the selected role.',
            image: {
                src: '/images/manuals/admin/assign-privilege2.webp',
                alt: 'The toggle shows if a privilege is given or denied depending on the label of it: ON / OFF',
                caption: 'Privilege toggle.',
            },
        },
        {
            title: 'Required privilege',
            body: 'Changing role privileges requires `ADMIN-04` which is only given to ADMIN users.',
        },
    ],
};
