module.exports = {
    key: 'projects.manage-project-achievements',
    title: 'Manage project achievements',
    type: 'workflow',
    status: 'complete',
    order: 80,
    summary: 'Record completed achievements and optional evidence links for a project.',
    appliesTo: ['Projects'],
    helpKey: 'projects.manage-project-achievements',
    sections: [
        {
            title: 'Achievement fields',
            body: 'An achievement has a title, description, achievement date, and optional evidence link.',
        },
        {
            title: 'Required data',
            body: 'The title and achievement date are required.',
        },
        {
            title: 'Update or delete',
            body: 'Use the edit and delete actions in the Achievements panel.',
        },
    ],
};
