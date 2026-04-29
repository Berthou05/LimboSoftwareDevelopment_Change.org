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
                        src: '/images/manuals/account/sign-in1.webp',
                        alt: 'Sign-in page visuallization',
                        caption: 'Sign-in page.',
                    },
                },
                {
                    title: 'Enter your credentials',
                    body: 'Type the email and password assigned to your account in the sign-in form.',
                    image: {
                        src: '/images/manuals/account/sign-in2.webp',
                        alt: 'Focus over the inputs of the sign-in form: email & password.',
                        caption: 'Fill email and passord inputs.',
                    },
                },
                {
                    title: 'Continue into the system',
                    body: 'Submit the form and wait for the system to redirect you to the main application.',
                    image: {
                        src: '/images/manuals/account/sign-in3.webp',
                        alt: 'Focus on the submit button.',
                        caption: 'Click on the submit button.',
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
                        src: '/images/manuals/account/edit-account1.webp',
                        alt: 'Account button at the right top corner of any page.',
                        caption: 'Account button is available at the top right corner of any page.',
                    },
                },
                {
                    title: 'Open the account settings view',
                    body: 'Choose the option that lets you review or edit your account details.',
                    image: {
                        src: '/images/manuals/account/edit-account2.webp',
                        alt: 'Click the Edit button at the top right corner of the data card.',
                        caption: 'Click the Edit button at the top right corner of the data card.',
                    },
                },
                {
                    title: 'Save the updated information',
                    body: 'Review the changed details before saving so your account reflects the expected information.',
                    image: {
                        src: '/images/manuals/account/edit-account3.webp',
                        alt: 'Once the information to edit is complete, click on the Save button.',
                        caption: '  Click on the Save button to save edited information.',
                    },
                },
            ],
        },
    ],
};
