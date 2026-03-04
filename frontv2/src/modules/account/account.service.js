const {
  getAccountById,
  updateOwnAccount,
} = require("../../data/repositories/inMemory/mockData.repository");

function findAccountById(accountId) {
  return getAccountById(accountId);
}

function saveOwnAccount(accountId, payload) {
  return updateOwnAccount(accountId, payload);
}

module.exports = {
  findAccountById,
  saveOwnAccount,
};

