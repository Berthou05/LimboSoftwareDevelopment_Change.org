const {
  getEmployees,
  getEmployeeById,
} = require("../../data/repositories/inMemory/mockData.repository");

function listEmployees() {
  return getEmployees();
}

function findEmployeeById(employeeId) {
  return getEmployeeById(employeeId);
}

module.exports = {
  listEmployees,
  findEmployeeById,
};

