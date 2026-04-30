module.exports = {
    key: 'projects.project-status.highlights',
    title: 'Manage project highlights',
    type: 'workflow',
    status: 'complete',
    order: 90,
    summary: 'Add, edit, and remove project highlights from the project side panel.',
    appliesTo: ['Projects'],
    helpKey: 'projects.project-status.highlights',
    sections: [
        {
            title: 'What highlights contain',
            body: 'A highlight has a title and content. Both fields are required.',
        },
        {
            title: 'Where highlights appear',
            body: 'Highlights appear in the Project Highlights panel on the project detail page.',
        },
        {
            title: 'Maintenance actions',
            body: 'Use the edit and delete actions in the highlights panel to keep highlights current.',
        },
    ],
};
