module.exports = {
    key: 'teams.edit-team',
    title: 'Edit team',
    type: 'tutorial',
    status: 'complete',
    order: 20,
    summary: 'Update a team name, description, or image.',
    appliesTo: ['Teams'],
    helpKey: 'teams.edit-team',
    steps: [
        { title: 'Open a team you lead', body: 'Only the responsible team lead can edit the team information card.' },
        { title: 'Open Edit Team Information', body: 'Use the edit action in the team details card.' },
        { title: 'Update details', body: 'Change the name, description, or image.' },
        { title: 'Save changes', body: 'Submit the popup to update the team.' },
    ],
};
