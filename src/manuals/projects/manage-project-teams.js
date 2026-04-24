module.exports = {
    key: 'projects.manage-project-teams',
    title: 'Manage project teams',
    type: 'workflow',
    status: 'complete',
    order: 60,
    summary: 'Connect teams to a project and remove teams that no longer participate.',
    appliesTo: ['Projects', 'Teams'],
    helpKey: 'projects.manage-project-teams',
    sections: [
        {
            title: 'Add a team',
            body: 'Use the Project Teams panel on a project page to choose an available team and add a short description of its contribution.',
        },
        {
            title: 'Remove a team',
            body: 'Use the remove action beside a project team when the team should no longer be connected to the project.',
        },
        {
            title: 'Description limit',
            body: 'Project team descriptions are limited to 50 characters.',
        },
    ],
};
