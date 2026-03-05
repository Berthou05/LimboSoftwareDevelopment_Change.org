const {
    getTeams,
    toggleTeamMembership,
} = require('../../data/repositories/inMemory/mockData.repository');

const listTeams = function listTeams() {
    return getTeams();
};

const setTeamMembership = function setTeamMembership(teamId, employeeId) {
    return toggleTeamMembership(teamId, employeeId);
};

module.exports = {
    listTeams,
    setTeamMembership,
};
