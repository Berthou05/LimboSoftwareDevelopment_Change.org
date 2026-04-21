module.exports = {
    key: 'account',
    title: 'Account',
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
        {
            key: 'account.recover-password',
            title: 'Recover password',
            summary: 'Request a password reset when you cannot access your account.',
            appliesTo: ['Account'],
            helpKey: 'account.recover-password',
            steps: [
                {
                    title: 'Open the recovery option',
                    body: 'Use the password recovery link from the sign-in page when you cannot remember your password.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for recovery link screenshot',
                        caption: 'Replace this placeholder with the recovery link screenshot.',
                    },
                },
                {
                    title: 'Enter your account email',
                    body: 'Provide the email address linked to your account so the recovery process can identify you.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for password recovery form screenshot',
                        caption: 'Replace this placeholder with the password recovery form screenshot.',
                    },
                },
                {
                    title: 'Follow the reset instructions',
                    body: 'Check the confirmation message or email and continue with the password reset steps provided by the system.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for password reset confirmation screenshot',
                        caption: 'Replace this placeholder with the password reset confirmation screenshot.',
                    },
                },
            ],
        },
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
