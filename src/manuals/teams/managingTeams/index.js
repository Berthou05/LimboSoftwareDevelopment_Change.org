const create = require('./create');
const edit = require('./edit');
const remove = require('./delete');

module.exports = {
    key: 'teams.managing-teams',
    title: 'Managing teams',
    summary: 'Create a new team, update its main information, or remove it from active listings.',
    appliesTo: ['Teams'],
    helpKey: 'teams.managing-teams',
    children: [
        create,
        edit,
        remove,
    ],
};
