module.exports = {
    key: 'auth.sign-in',
    title: 'Sign in',
    type: 'tutorial',
    status: 'complete',
    order: 10,
    summary: 'Sign in to Unitas System with your email and password.',
    appliesTo: ['Auth'],
    helpKey: 'auth.sign-in',
    steps: [
        { title: 'Open the sign in page', body: 'Go to the application sign in screen.' },
        { title: 'Enter credentials', body: 'Enter your email and password.' },
        { title: 'Submit', body: 'Submit the form. If the credentials are valid, the system opens the authenticated area.' },
    ],
};
