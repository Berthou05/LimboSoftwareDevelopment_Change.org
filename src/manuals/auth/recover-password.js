module.exports = {
    key: 'auth.recover-password',
    title: 'Recover password',
    type: 'tutorial',
    status: 'complete',
    order: 20,
    summary: 'Reset your password with the reset code sent to your email.',
    appliesTo: ['Auth'],
    helpKey: 'auth.recover-password',
    steps: [
        { title: 'Open Reset Password', body: 'Click `Reset Password` from the sign in page.' },
        { title: 'Request a reset code', body: 'Enter your email and submit the reset request.' },
        { title: 'Enter the code', body: 'Open the reset confirmation page and enter the code sent to your email.' },
        { title: 'Enter your new password', body: 'Enter and confirm a new password that meets the visible password requirements.' },
    ],
};
