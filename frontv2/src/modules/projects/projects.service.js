const {
  getProjects,
  toggleProjectMembership,
} = require("../../data/repositories/inMemory/mockData.repository");

function listProjects() {
  return getProjects();
}

function setProjectMembership(projectId, employeeId) {
  return toggleProjectMembership(projectId, employeeId);
}

module.exports = {
  listProjects,
  setProjectMembership,
};

