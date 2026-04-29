const managingProjectTeamsAddTeam = require('./addTeam');
const managingProjectTeamsEditTeam = require('./editTeam');
const managingProjectTeamsDeleteTeam = require('./deleteTeam');

module.exports = {
    key: 'projects.managing-project-teams',
    title: 'Managing project teams',
    summary: 'Add, edit, or remove team relationships inside a project.',
    appliesTo: ['Projects', 'Teams'],
    helpKey: 'projects.managing-project-teams',
    children: [
        managingProjectTeamsAddTeam,
        managingProjectTeamsEditTeam,
        managingProjectTeamsDeleteTeam,
    ],
};
