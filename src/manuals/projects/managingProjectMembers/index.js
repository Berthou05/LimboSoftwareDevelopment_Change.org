const managingProjectMembersAddMember = require('./addMember');
const managingProjectMembersEditMember = require('./editMember');
const managingProjectMembersDeleteMember = require('./deleteMember');

module.exports = {
    key: 'projects.managing-project-members',
    title: 'Managing project members',
    summary: 'Add, edit, or remove employee relationships inside a project.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.managing-project-members',
    children: [
        managingProjectMembersAddMember,
        managingProjectMembersEditMember,
        managingProjectMembersDeleteMember,
    ],
};
