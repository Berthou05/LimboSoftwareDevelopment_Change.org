const managingProjectsCreate = require('./managingProjectsCreate');
const managingProjectsEdit = require('./managingProjectsEdit');
const managingProjectsDelete = require('./managingProjectsDelete');
const managingProjectsJoin = require('./managingProjectsJoin');
const managingProjectsLeave = require('./managingProjectsLeave');

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