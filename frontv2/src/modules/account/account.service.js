const {
    getAccountById,
    updateOwnAccount,
} = require('../../data/repositories/inMemory/mockData.repository');

const findAccountById = function findAccountById(accountId) {
    return getAccountById(accountId);
};

const saveOwnAccount = function saveOwnAccount(accountId, payload) {
    return updateOwnAccount(accountId, payload);
};

module.exports = {
    findAccountById,
    saveOwnAccount,
};
