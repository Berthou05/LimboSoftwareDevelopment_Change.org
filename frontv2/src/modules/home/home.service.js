const { getHomeData } = require('../../data/repositories/inMemory/mockData.repository');

const getHomeByEmployeeId = function getHomeByEmployeeId(employeeId) {
    return getHomeData(employeeId);
};

module.exports = {
    getHomeByEmployeeId,
};
