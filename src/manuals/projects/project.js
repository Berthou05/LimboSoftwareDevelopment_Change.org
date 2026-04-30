const managingTeams = require('./managingProjectTeams');
const managingTeamMembers = require('./managingProjectMembers');
const managingProjects = require('./managingProjects');
const projectStatus = require('./project-status');

module.exports = {
    key: 'projects',
    title: 'Projects',
    description: 'Guides for creating, editing, joining, and organizing projects.',
    entries: [
        managingProjects,
        managingTeams,
        managingTeamMembers,
        projectStatus,
    ],
};
