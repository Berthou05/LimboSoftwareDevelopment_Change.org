const managingTeams = require('./managingProjectTeams');
const managingTeamMembers = require('./managingProjectMembers');
const managingProjects = require('./managingProjects');

module.exports = {
    key: 'teams',
    title: 'Projects',
    description: 'Guides for creating, editing, joining, and organizing projects.',
    entries: [
        managingProjects,
        managingTeams,
        managingTeamMembers,
    ],
};