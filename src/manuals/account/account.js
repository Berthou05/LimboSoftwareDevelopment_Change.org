const recoverPassword = require('../auth/recover-password');

module.exports = {
    key: 'account',
    title: 'Sign-in info',
    description: 'Guides for signing in, recovering access, and updating your personal account details.',
    entries: [
        {
            key: 'account.sign-in',
            title: 'Sign in',
            summary: 'Access the system with your assigned email and password.',
            appliesTo: ['Account'],
            helpKey: 'account.sign-in',
            steps: [
                {
                    title: 'Open the sign-in page',
                    body: 'Go to the system login page when you need to start a new session.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for sign-in page screenshot',
                        caption: 'Replace this placeholder with the sign-in page screenshot.',
                    },
                },
                {
                    title: 'Enter your credentials',
                    body: 'Type the email and password assigned to your account in the sign-in form.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for sign-in form screenshot',
                        caption: 'Replace this placeholder with the sign-in form screenshot.',
                    },
                },
                {
                    title: 'Continue into the system',
                    body: 'Submit the form and wait for the system to redirect you to the main application.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for post sign-in screenshot',
                        caption: 'Replace this placeholder with the post sign-in screenshot.',
                    },
                },
            ],
        },
        recoverPassword,
        {
            key: 'account.edit-account',
            title: 'Edit account',
            summary: 'Review and update the information associated with your personal account.',
            appliesTo: ['Account'],
            helpKey: 'account.edit-account',
            steps: [
                {
                    title: 'Open your account menu',
                    body: 'Use the account button in the application header to access your account options.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for account menu screenshot',
                        caption: 'Replace this placeholder with the account menu screenshot.',
                    },
                },
                {
                    title: 'Open the account settings view',
                    body: 'Choose the option that lets you review or edit your account details.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for account settings screenshot',
                        caption: 'Replace this placeholder with the account settings screenshot.',
                    },
                },
                {
                    title: 'Save the updated information',
                    body: 'Review the changed details before saving so your account reflects the expected information.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for account save screenshot',
                        caption: 'Replace this placeholder with the account save screenshot.',
                    },
                },
            ],
        },
    ],
};
