module.exports = {
    key: 'concepts.roles-and-permissions',
    title: 'Use roles safely',
    type: 'concept',
    status: 'complete',
    order: 30,
    summary: 'Assign roles and privileges in a way that keeps access clear and easy to review.',
    appliesTo: ['Admin', 'Projects', 'Teams'],
    helpKey: 'concepts.roles-and-permissions',
    sections: [
        {
            title: 'Create roles by responsibility',
            body: 'Name roles after the work people are expected to do, such as administrator, project lead, or team lead. Avoid creating roles for one temporary exception.',
            image: {
                src: '/images/manuals/concepts/roles-permissions1.webp',
                alt: '.',
                caption: '".',
            },

        },
        {
            title: 'Grant the smallest useful set of privileges',
            body: 'Turn on only the privileges the role needs. This makes the Roles Administration matrix easier to audit and reduces accidental access to admin or member-management actions.',
            image: {
                src: '/images/manuals/concepts/roles-permissions2.webp',
                alt: '.',
                caption: '".',
            },

        },
        {
            title: 'Check lead ownership before troubleshooting',
            body: 'If a user cannot delete a project or team, first confirm whether they are the responsible lead. Some lead-only actions are not solved by changing role privileges.',
            image: {
                src: '/images/manuals/concepts/roles-permissions3.webp',
                alt: '.',
                caption: '".',
            },

        },
    ],
};
