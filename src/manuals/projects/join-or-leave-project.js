module.exports = {
    key: 'projects.join-or-leave-project',
    title: 'Join or leave project',
    type: 'tutorial',
    status: 'complete',
    order: 40,
    summary: 'Join or leave a project from the project detail page.',
    appliesTo: ['Projects', 'Employees'],
    helpKey: 'projects.join-or-leave-project',
    steps: [
        { title: 'Open the project', body: 'Open the project you want to join or leave.' },
        { title: 'Use the membership button', body: 'Click `Join Project` or `Leave Project` in the side panel.' },
        { title: 'Check the result', body: 'The page updates your membership state after the request succeeds.' },
    ],
};
