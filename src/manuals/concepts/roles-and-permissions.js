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
                alt: 'Showcase of the Roles Administration page with focus on the Create Role button.',
                caption: 'The ADMIN is able to create any necessary role.',
            },

        },
        {
            title: 'Grant the smallest useful set of privileges',
            body: 'Turn on only the privileges the role needs. This makes the Roles Administration matrix easier to audit and reduces accidental access to admin or member-management actions.',
            image: {
                src: '/images/manuals/concepts/roles-permissions2.webp',
                alt: 'Focus on the toggle of each privilege by role in the Role Administration page.',
                caption: 'Turn the toggle ON / OFF to give or revoke privileges in the system.',
            },

        },
        {
            title: 'Check lead ownership before troubleshooting',
            body: 'If a user cannot delete a project or team, first confirm whether they are the responsible lead. Some lead-only actions are not solved by changing role privileges.',
            image: {
                src: '/images/manuals/concepts/roles-permissions3.webp',
                alt: 'Showcase of Delete button in the Projects section. Only the creator of such project or team is able to delete it and edit it',
                caption: 'Only the creator of a project or team is able to delete it.',
            },

        },
    ],
};
