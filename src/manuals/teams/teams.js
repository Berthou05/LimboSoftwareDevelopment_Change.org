const managingTeams = require('./managingTeams');
const managingTeamMembers = require('./managingTeamMembers');

module.exports = {
    key: 'teams',
    title: 'Teams',
    description: 'Guides for creating, editing, joining, and organizing teams.',
    entries: [
        managingTeams,
        managingTeamMembers,
    ],
};