const { authenticate } = require('../../data/repositories/inMemory/mockData.repository');

/*
 * Thin service wrapper keeps controllers independent from repository import paths.
 */
const loginWithIdentity = function loginWithIdentity(identity, password) {
    return authenticate(identity, password);
};

module.exports = {
    loginWithIdentity,
};
