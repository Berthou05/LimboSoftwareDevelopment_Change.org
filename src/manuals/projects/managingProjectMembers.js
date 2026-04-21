const managingProjectMembersAddMember = require('./managingProjectMembersAddMember');
const managingProjectMembersEditMember = require('./managingProjectMembersEditMember');
const managingProjectMembersDeleteMember = require('./managingProjectMembersDeleteMember');

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
