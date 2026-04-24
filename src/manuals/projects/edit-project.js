module.exports = {
    key: 'projects.edit-project',
    title: 'Edit project',
    type: 'tutorial',
    status: 'complete',
    order: 20,
    summary: 'Update project name, description, status, and dates from the project detail page.',
    appliesTo: ['Projects'],
    helpKey: 'projects.edit-project',
    steps: [
        { title: 'Open the project', body: 'Open the project detail page.' },
        { title: 'Open Edit Project Information', body: 'Use the edit action in the project information card.' },
        { title: 'Update fields', body: 'Change the name, description, status, start date, or end date.' },
        { title: 'Save changes', body: 'Submit the popup. The system validates the status and date range before saving.' },
    ],
};
