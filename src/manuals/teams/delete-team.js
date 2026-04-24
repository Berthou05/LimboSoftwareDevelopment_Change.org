module.exports = {
    key: 'teams.delete-team',
    title: 'Delete team',
    type: 'tutorial',
    status: 'complete',
    order: 30,
    summary: 'Disable a team from active team listings.',
    appliesTo: ['Teams'],
    helpKey: 'teams.delete-team',
    steps: [
        { title: 'Open a team you lead', body: 'Only the responsible team lead can delete the team.' },
        { title: 'Click Delete Team', body: 'Use the delete action on the team page.' },
        { title: 'Confirm deletion', body: 'Click `Delete` in the confirmation popup.' },
    ],
};
