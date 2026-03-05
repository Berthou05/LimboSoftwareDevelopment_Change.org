const {
    getProjects,
    toggleProjectMembership,
} = require('../../data/repositories/inMemory/mockData.repository');

const listProjects = function listProjects() {
    return getProjects();
};

const setProjectMembership = function setProjectMembership(projectId, employeeId) {
    return toggleProjectMembership(projectId, employeeId);
};

module.exports = {
    listProjects,
    setProjectMembership,
};
