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
        { title: 'Open Accounts Administration', body: 'Open the Accounts Administration page.' },
        { title: 'Find the account', body: 'Locate the account to modify.' },
        { title: 'Select the role', body: 'Use the role control dropdown for that account.' },
        { title: 'Save the change', body: 'Submit the role change. The page shows feedback when the update succeeds.' },
    ],
};
