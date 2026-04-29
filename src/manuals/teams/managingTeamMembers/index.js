const addMember = require('./addMember');
const editMember = require('./editMember');
const deleteMember = require('./deleteMember');

module.exports = {
    key: 'teams.managing-team-members',
    title: 'Managing team members',
    summary: 'Add, edit, or remove employees from a team.',
    appliesTo: ['Teams', 'Employees'],
    helpKey: 'teams.managing-team-members',
    children: [
        addMember,
        editMember,
        deleteMember,
    ],
};
