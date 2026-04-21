module.exports = {
    key: 'roles.manage',
    title: 'Managing roles',
    summary: 'Groups role creation, privilege updates, and safe review of permissions into one administration guide.',
    appliesTo: ['Roles', 'Admin'],
    helpKey: 'roles.manage',
    steps: [
        { title: 'Open Roles Administration', body: 'Use the administration module when you need to create a role or update the privileges already assigned to one.' },
        { title: 'Review permissions before saving', body: 'Document role changes by responsibility instead of listing each checkbox in a separate manual entry.' },
        { title: 'Confirm role impact', body: 'Before saving, check which users or workflows depend on that role so permission changes stay intentional.' },
    ],
};
