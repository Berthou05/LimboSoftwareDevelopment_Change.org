const MANUAL_LIBRARY = [
    {
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
    },
    {
        key: 'workspace',
        title: 'Workspace guides',
        description: 'Task-focused guides grouped by module instead of duplicating each CRUD action.',
        entries: [
            {
                key: 'projects.manage',
                title: 'Managing projects',
                summary: 'Covers creating a project, updating its details, and reviewing project activity from the same guide.',
                appliesTo: ['Projects'],
                helpKey: 'projects.manage',
                steps: [
                    { title: 'Open the project directory', body: 'Start in the Projects page to search existing projects or create a new one from the same screen.' },
                    { title: 'Use the project form', body: 'Project creation and editing should reuse the shared forms guide so field expectations stay in one place.' },
                    { title: 'Review members, goals, and activity', body: 'Once the project exists, continue from the project detail view instead of splitting the guide into separate pages.' },
                ],
            },
            {
                key: 'roles.manage',
                title: 'Managing roles',
                summary: 'Groups role creation, privilege updates, and safe review of permissions into one administration guide.',
                appliesTo: ['Roles', 'Admin'],
                helpKey: 'roles.manage',
                steps: [
                    { title: 'Open Roles Administration', body: 'Use the administration module when you need to create a role or update the privileges already assigned to one.' },
                    { title: 'Review permissions before saving', body: 'Document role changes by responsibility instead of listing each checkbox in a separate manual entry.' },
                    { title: 'Confirm role impact', body: 'Before saving, check which users or workflows depend on that role so permission changes stay intentional.' },
                ],
            },
            {
                key: 'daily-entries.slack',
                title: 'Submitting a Slack daily entry',
                summary: 'Explains the Slack flow as one entry because the user goal is to submit a complete update, not to learn each field separately.',
                appliesTo: ['Slack standups', 'Daily entry'],
                helpKey: 'daily-entries.slack',
                steps: [
                    { title: 'Start from the Slack prompt', body: 'The guide should begin where the user receives the daily reminder, because that is the true entry point for the flow.' },
                    { title: 'Complete the requested update', body: 'Reuse the shared forms language for required answers, validation, and retry behavior if the submission is incomplete.' },
                    { title: 'Confirm the entry was recorded', body: 'End the guide with what success looks like in Slack and in the application so the flow has a clear finish.' },
                ],
            },
            {
                key: 'reports.generate',
                title: 'Generating reports',
                summary: 'Keeps report setup, filter selection, and output review together because users think of it as one reporting flow.',
                appliesTo: ['Reports', 'Home'],
                helpKey: 'reports.generate',
                steps: [
                    { title: 'Choose the report scope', body: 'Start with employee, team, or project so the same guide can cover the shared report generator used across the system.' },
                    { title: 'Set the date range and filters', body: 'Reuse the shared tables and validation language for date rules instead of rewriting it inside each report type.' },
                    { title: 'Review or regenerate the output', body: 'Close with how to validate the generated report and when to adjust the input before trying again.' },
                ],
            },
        ],
    },
];

module.exports = class HelpEntry {
    static fetchManualLibrary() {
        return MANUAL_LIBRARY;
    }
};
