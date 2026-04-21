module.exports = {
    key: 'foundations',
    title: 'Shared flows',
    description: 'Patterns reused by projects, roles, reports, and Slack daily entries.',
    entries: [
        {
            key: 'shared.forms',
            title: 'Completing forms and handling validation',
            summary: 'Use one entry for create and edit flows because both screens follow the same form rules.',
            appliesTo: ['Projects', 'Roles', 'Slack daily entry'],
            helpKey: 'shared.forms',
            steps: [
                { title: 'Fill required fields first', body: 'Start with the name, date, or description fields that define the record before adjusting optional values.' },
                { title: 'Check validation messages in place', body: 'When a field is invalid, correct that field before retrying so the form can submit without losing the rest of the data.' },
                { title: 'Review before saving', body: 'Use this same review step for both create and edit actions because confirmation depends on the final values shown in the form.' },
            ],
        },
        {
            key: 'shared.tables',
            title: 'Reading tables, filters, and confirmations',
            summary: 'List pages share the same flow: scan, filter, open details, then confirm changes such as delete or disable.',
            appliesTo: ['Projects', 'Roles', 'Reports'],
            helpKey: 'shared.tables',
            steps: [
                { title: 'Use the search or filter controls first', body: 'Reduce the visible rows before opening an item so the directory stays easier to review.' },
                { title: 'Open the target record from the list', body: 'After selecting a row or card, use the available action button instead of repeating the search from the start.' },
                { title: 'Confirm destructive changes carefully', body: 'Disable, remove, or close actions should explain the impact before the final confirmation.' },
            ],
        },
    ],
};
