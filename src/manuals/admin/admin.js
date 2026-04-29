const roles = require('./manage-roles');

module.exports = {
    key: 'admin',
    title: 'Admin',
    description: 'Guides for administration workflows such as accounts, roles, and permissions.',
    entries: [
        {
            key: 'admin.managing-accounts',
            title: 'Managing accounts',
            summary: 'Create, review, and maintain user accounts from the administration area.',
            appliesTo: ['Admin'],
            helpKey: 'admin.managing-accounts',
            steps: [
                {
                    title: 'Open Accounts Administration',
                    body: 'Go to the administration area and open the accounts section.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for accounts administration screenshot',
                        caption: 'Replace this placeholder with the accounts administration screenshot.',
                    },
                },
                {
                    title: 'Choose the account action',
                    body: 'Use the available controls to create an account, review one, or update its details.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for account action controls screenshot',
                        caption: 'Replace this placeholder with the account action controls screenshot.',
                    },
                },
                {
                    title: 'Save the account change',
                    body: 'Confirm the account information before saving so the update matches the user you intend to manage.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for account save screenshot',
                        caption: 'Replace this placeholder with the account save screenshot.',
                    },
                },
            ],
        },
        roles,
        {
            key: 'admin.managing-permissions',
            title: 'Managing permissions',
            summary: 'Review how permissions affect system access and role behavior.',
            appliesTo: ['Admin'],
            helpKey: 'admin.managing-permissions',
            steps: [
                {
                    title: 'Open the permission controls',
                    body: 'Navigate to the role or privilege area where permissions can be reviewed.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for permission controls screenshot',
                        caption: 'Replace this placeholder with the permission controls screenshot.',
                    },
                },
                {
                    title: 'Check the affected workflows',
                    body: 'Review which modules or actions are enabled before changing a permission.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for affected workflows screenshot',
                        caption: 'Replace this placeholder with the affected workflows screenshot.',
                    },
                },
                {
                    title: 'Save the permission update',
                    body: 'Save only after confirming the permission change matches the intended access level.',
                    image: {
                        src: '/images/manuals/manual-image-required.svg',
                        alt: 'Placeholder for permission save screenshot',
                        caption: 'Replace this placeholder with the permission save screenshot.',
                    },
                },
            ],
        },
    ],
};
