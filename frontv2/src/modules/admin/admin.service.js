const {
  privilegesCatalog,
  getAccounts,
  getRoles,
  updateAccountRole,
  updateAccountStatus,
  toggleRolePrivilege,
} = require("../../data/repositories/inMemory/mockData.repository");

function listAccounts() {
  return getAccounts();
}

function listRoles() {
  return getRoles();
}

function listPrivilegesCatalog() {
  return privilegesCatalog;
}

function setAccountRole(accountId, roleId) {
  return updateAccountRole(accountId, roleId);
}

function setAccountStatus(accountId, status) {
  return updateAccountStatus(accountId, status);
}

function setRolePrivilege(roleId, privilegeCode) {
  return toggleRolePrivilege(roleId, privilegeCode);
}

module.exports = {
  listAccounts,
  listRoles,
  listPrivilegesCatalog,
  setAccountRole,
  setAccountStatus,
  setRolePrivilege,
};

