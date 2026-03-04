const { getHomeData } = require("../../data/repositories/inMemory/mockData.repository");

function getHomeByEmployeeId(employeeId) {
  return getHomeData(employeeId);
}

module.exports = {
  getHomeByEmployeeId,
};

