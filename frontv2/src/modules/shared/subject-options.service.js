const {
    getEmployees,
    getTeams,
    getProjects,
    getEmployeeById,
} = require('../../data/repositories/inMemory/mockData.repository');

/*
 * Converts each domain entity into a generic subject option used by report forms.
 */
const findSubjectOptions = function findSubjectOptions() {
    const employees = [];
    const teams = [];
    const projects = [];

    for (const employee of getEmployees()) {
        employees.push({
            id: employee.id,
            label: employee.fullName,
            type: 'EMPLOYEE',
        });
    }

    for (const team of getTeams()) {
        teams.push({
            id: team.id,
            label: team.name,
            type: 'TEAM',
        });
    }

    for (const project of getProjects()) {
        projects.push({
            id: project.id,
            label: project.name,
            type: 'PROJECT',
        });
    }

    return {
        employees,
        teams,
        projects,
    };
};

/*
 * Filters subject options based on user role:
 * - Employee: can only report on themselves and projects they participate in
 * - Lead: can report on team members, teams they lead, and projects their teams work on
 * - Admin: can report on everyone
 */
const findFilteredSubjectOptions = function findFilteredSubjectOptions(employeeId, roleName) {
    const role = String(roleName || '').toLowerCase();
    const allTeams = getTeams();
    const allProjects = getProjects();
    const currentEmployee = getEmployeeById(employeeId);

    // Admin can see everything
    if (role === 'admin') {
        return findSubjectOptions();
    }

    // Lead: show team members from teams they are responsible for
    if (role === 'lead') {
        const ledTeams = allTeams.filter((team) => team.responsibleEmployeeId === employeeId);
        const teamMemberIds = new Set();
        const teamIds = new Set();

        for (const team of ledTeams) {
            teamIds.add(team.id);
            for (const member of team.members || []) {
                teamMemberIds.add(member.employeeId);
            }
        }

        const employees = [];
        for (const emp of getEmployees()) {
            if (teamMemberIds.has(emp.id)) {
                employees.push({
                    id: emp.id,
                    label: emp.fullName,
                    type: 'EMPLOYEE',
                });
            }
        }

        const teams = [];
        for (const team of allTeams) {
            if (teamIds.has(team.id)) {
                teams.push({
                    id: team.id,
                    label: team.name,
                    type: 'TEAM',
                });
            }
        }

        // Include projects that the led teams are associated with
        const projects = [];
        for (const project of allProjects) {
            const projectTeamIds = project.teamIds || [];
            const hasLedTeam = projectTeamIds.some((tid) => teamIds.has(tid));
            if (hasLedTeam) {
                projects.push({
                    id: project.id,
                    label: project.name,
                    type: 'PROJECT',
                });
            }
        }

        return {
            employees,
            teams,
            projects,
        };
    }

    // Employee: can only report on themselves and projects they participate in
    const employees = [];
    if (currentEmployee) {
        employees.push({
            id: currentEmployee.id,
            label: currentEmployee.fullName,
            type: 'EMPLOYEE',
        });
    }

    const projects = [];
    for (const project of allProjects) {
        const participantIds = project.participantIds || [];
        if (participantIds.includes(employeeId)) {
            projects.push({
                id: project.id,
                label: project.name,
                type: 'PROJECT',
            });
        }
    }

    return {
        employees,
        teams: [],
        projects,
    };
};

module.exports = {
    findSubjectOptions,
    findFilteredSubjectOptions,
};
