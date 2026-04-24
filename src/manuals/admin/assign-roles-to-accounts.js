module.exports = {
    key: 'admin.assign-roles-to-accounts',
    title: 'Assign roles to accounts',
    type: 'tutorial',
    status: 'complete',
    order: 40,
    summary: 'Change the role assigned to an existing account.',
    appliesTo: ['Admin', 'Auth'],
    helpKey: 'admin.assign-roles-to-accounts',
    steps: [
        { title: 'Open Accounts', body: 'Open the Admin Accounts page.' },
        { title: 'Find the account', body: 'Locate the account that needs a different role.' },
        { title: 'Select the role', body: 'Use the role control for that account.' },
        { title: 'Save the change', body: 'Submit the role change. The page shows feedback when the update succeeds.' },
    ],
};
