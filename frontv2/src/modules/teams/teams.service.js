const {
  getTeams,
  toggleTeamMembership,
} = require("../../data/repositories/inMemory/mockData.repository");

function listTeams() {
  return getTeams();
}

function setTeamMembership(teamId, employeeId) {
  return toggleTeamMembership(teamId, employeeId);
}

module.exports = {
  listTeams,
  setTeamMembership,
};

