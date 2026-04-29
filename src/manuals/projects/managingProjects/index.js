const managingProjectsCreate = require('./create');
const managingProjectsEdit = require('./edit');
const managingProjectsDelete = require('./delete');
const managingProjectsJoin = require('./join');
const managingProjectsLeave = require('./leave');

module.exports = {
    key: 'projects.managing-projects',
    title: 'Managing projects',
    summary: 'Create, edit, delete, join, or leave projects from the Project module.',
    appliesTo: ['Projects'],
    helpKey: 'projects.managing-projects',
    children: [
        managingProjectsCreate,
        managingProjectsEdit,
        managingProjectsDelete,
        managingProjectsJoin,
        managingProjectsLeave,
    ],
};
