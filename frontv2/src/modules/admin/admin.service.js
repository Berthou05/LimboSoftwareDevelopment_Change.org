const {
    privilegesCatalog,
    getAccounts,
    getRoles,
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
    setAccountRole,
    setAccountStatus,
    setRolePrivilege,
};
