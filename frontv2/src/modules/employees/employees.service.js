const {
    getEmployees,
    getEmployeeById,
} = require('../../data/repositories/inMemory/mockData.repository');

const listEmployees = function listEmployees() {
    return getEmployees();
};

const findEmployeeById = function findEmployeeById(employeeId) {
    return getEmployeeById(employeeId);
};

module.exports = {
    listEmployees,
    findEmployeeById,
};
