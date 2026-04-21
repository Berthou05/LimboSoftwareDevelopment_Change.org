const managingProjects = require('./managingProjects');
const managingProjectTeams = require('./managingProjectTeams');
const managingProjectMembers = require('./managingProjectMembers');

module.exports = {
    key: 'projects',
    title: 'Projects',
    description: 'Guides for creating, editing, joining, and organizing projects.',
    entries: [
        managingProjects,
        managingProjectTeams,
        managingProjectMembers,
    ],
};
