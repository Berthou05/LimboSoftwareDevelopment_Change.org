const registerAccounts = require('./register-accounts');
const roles = require('./manage-roles');
const assignPrivileges = require('./assign-privileges');
const assignRolesToAccounts = require('./assign-roles-to-accounts');

module.exports = {
    key: 'admin',
    title: 'Admin',
    description: 'Guides for administration workflows such as accounts, roles, and permissions.',
    entries: [
        registerAccounts,
        roles,
        assignPrivileges,
        assignRolesToAccounts,
    ],
};
