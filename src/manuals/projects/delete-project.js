module.exports = {
    key: 'projects.delete-project',
    title: 'Delete project',
    type: 'tutorial',
    status: 'complete',
    order: 30,
    summary: 'Disable a project from active project listings.',
    appliesTo: ['Projects'],
    helpKey: 'projects.delete-project',
    steps: [
        { title: 'Open a project you lead', body: 'Only the responsible project lead can delete the project.' },
        { title: 'Click Delete project', body: 'Use the `Delete project` action at the bottom of the project page side panel.' },
        { title: 'Confirm deletion', body: 'Read the confirmation message and click `Delete` to disable the project.' },
    ],
};
