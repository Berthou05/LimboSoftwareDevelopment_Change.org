module.exports = {
    key: 'projects.create-project',
    title: 'Create project',
    type: 'tutorial',
    status: 'complete',
    order: 10,
    summary: 'Create a new project and assign yourself as its responsible lead.',
    appliesTo: ['Projects'],
    helpKey: 'projects.create-project',
    steps: [
        { title: 'Open Projects', body: 'Open the Projects page.' },
        { title: 'Click New Project', body: 'Click `New Project`.' },
        { title: 'Complete the form', body: 'Enter a name, description, start date, and end date. The name and start date are required.' },
        { title: 'Submit the project', body: 'Submit the form. The project appears in your projects after it is created.' },
    ],
};
