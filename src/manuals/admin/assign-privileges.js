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
        },
        {
            title: 'Toggle behavior',
            body: 'Click `ON` or `OFF` to change the selected privilege for the selected role.',
        },
        {
            title: 'Required privilege',
            body: 'Changing role privileges requires `ADMIN-04` which is only given to ADMIN users.',
        },
    ],
};
