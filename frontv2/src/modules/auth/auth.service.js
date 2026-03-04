const { authenticate } = require("../../data/repositories/inMemory/mockData.repository");

function loginWithIdentity(identity, password) {
  return authenticate(identity, password);
}

module.exports = {
  loginWithIdentity,
};

