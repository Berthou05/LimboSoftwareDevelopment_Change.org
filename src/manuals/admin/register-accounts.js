module.exports = {
    key: 'admin.register-accounts',
    title: 'Register accounts',
    type: 'tutorial',
    status: 'complete',
    order: 10,
    summary: 'Create an account from the admin accounts area.',
    appliesTo: ['Admin', 'Auth'],
    helpKey: 'admin.register-accounts',
    steps: [
        { title: 'Open Accounts', body: 'Open the Admin Accounts page.' },
        { title: 'Click Create Account', body: 'Use the `Create Account` action.' },
        { title: 'Enter account details', body: 'Enter the required identity, email, password, and role details.' },
        { title: 'Create the account', body: 'Submit the form. The account is created when validation succeeds.' },
    ],
};
