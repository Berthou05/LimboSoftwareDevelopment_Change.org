module.exports = {
    key: 'projects.project-status.goals',
    title: 'Manage project goals',
    type: 'workflow',
    status: 'complete',
    order: 70,
    summary: 'Create, update, and remove goals on a project.',
    appliesTo: ['Projects'],
    helpKey: 'projects.project-status.goals',
    sections: [
        {
            title: 'Goal fields',
            body: 'A goal has a title, description, status, and optional due date.',
        },
        {
            title: 'Allowed statuses',
            body: 'Goal status must be one of the supported status values.',
            items: ['PLANNED', 'IN PROGRESS', 'ON HOLD', 'COMPLETED', 'CANCELLED'],
        },
        {
            title: 'Edit or remove goals',
            body: 'Use the edit and delete actions in the Goals panel.',
        },
    ],
};
