const {
  getEmployees,
  getTeams,
  getProjects,
} = require("../../data/repositories/inMemory/mockData.repository");

function findSubjectOptions() {
  const employees = getEmployees().map((employee) => ({
    id: employee.id,
    label: employee.fullName,
    type: "EMPLOYEE",
  }));

  const teams = getTeams().map((team) => ({
    id: team.id,
    label: team.name,
    type: "TEAM",
  }));

  const projects = getProjects().map((project) => ({
    id: project.id,
    label: project.name,
    type: "PROJECT",
  }));

  return { employees, teams, projects };
}

module.exports = {
  findSubjectOptions,
};

