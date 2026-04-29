module.exports = {
    key: 'quick-start.assign-a-team-member',
    title: 'Assign a team member',
    type: 'tutorial',
    status: 'complete',
    order: 40,
    summary: 'Add an employee to a team from the team detail page.',
    appliesTo: ['Teams', 'Employees'],
    helpKey: 'quick-start.assign-a-team-member',
    steps: [
        {
            title: 'Open the team',
            body: 'Go to Teams and open the team that should receive the new member.',
        },
        {
            title: 'Find team participants',
            body: 'Use the Team Participants panel on the team page.',
        },
        {
            title: 'Select the employee and role',
            body: 'Choose the employee and select a role such as `LEAD` or `EMPLOYEE`.',
        },
        {
            title: 'Add the member',
            body: 'Submit the form. The employee appears in the team participant list when the change succeeds.',
        },
    ],
};
