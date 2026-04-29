module.exports = {
    key: 'concepts.roles-and-permissions',
    title: 'How roles and permissions work',
    type: 'concept',
    status: 'complete',
    order: 30,
    summary: 'Understand how account roles control access to administrative and member-management actions.',
    appliesTo: ['Admin', 'Projects', 'Teams'],
    helpKey: 'concepts.roles-and-permissions',
    sections: [
        {
            title: 'Roles group privileges',
            body: 'A role is a named collection of privilege codes. Admin users turn privileges on or off for each role in the Roles Administration matrix.',
        },
        {
            title: 'Privileges protect actions',
            body: 'Some routes require specific privileges, such as adding project members, managing team members, creating accounts, or changing role privileges.',
        },
        {
            title: 'Lead ownership still matters',
            body: 'Some actions are limited by ownership. For example, only the responsible project lead can delete that project, and only the responsible team lead can delete that team.',
        },
    ],
};
