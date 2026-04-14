const {
    privilegesCatalog,
    getAccounts,
    getRoles,
    createAccount,
    updateAccountRole,
    updateAccountStatus,
    toggleRolePrivilege,
} = require('../../data/repositories/inMemory/mockData.repository');

const listAccounts = function listAccounts() {
    return getAccounts();
};

const listRoles = function listRoles() {
    return getRoles();
};

const listPrivilegesCatalog = function listPrivilegesCatalog() {
    return privilegesCatalog;
};

const createManagedAccount = function createManagedAccount(payload) {
    return createAccount(payload);
};

const setAccountRole = function setAccountRole(accountId, roleId) {
    return updateAccountRole(accountId, roleId);
};

const setAccountStatus = function setAccountStatus(accountId, status) {
    return updateAccountStatus(accountId, status);
};

const setRolePrivilege = function setRolePrivilege(roleId, privilegeCode) {
    return toggleRolePrivilege(roleId, privilegeCode);
};

module.exports = {
    listAccounts,
    listRoles,
    listPrivilegesCatalog,
    createManagedAccount,
    setAccountRole,
    setAccountStatus,
    setRolePrivilege,
};
