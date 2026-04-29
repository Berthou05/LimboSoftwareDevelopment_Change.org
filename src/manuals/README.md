# Manuals

Manual content is split by section so each guide can be edited independently.

## Active structure

- `quick-start/`: first-use task guides
- `concepts/`: conceptual explanations shared across modules
- `projects/`: project workflows and references
- `teams/`: team workflows and references
- `employees/`: employee profile and activity guides
- `reports/`: report generation and output guides
- `admin/`: account, role, and privilege administration guides
- `auth/`: sign in and password recovery guides
- `index.js`: loads guide files from the section folders

Each active guide file exports one CommonJS guide object. The loader only includes files with `key`, `title`, `type`, and `status`.

## Tutorial guide

```js
module.exports = {
    key: 'projects.create-project',
    title: 'Create project',
    type: 'tutorial',
    status: 'complete',
    summary: 'Create a new project and assign yourself as its responsible lead.',
    appliesTo: ['Projects'],
    helpKey: 'projects.create-project',
    steps: [
        {
            title: 'Open Projects',
            body: 'Open the Projects page.',
            image: {
                src: '/images/manuals/projects/create-project-1.webp',
                alt: 'Projects page',
            },
        },
    ],
};
```

## Concept, workflow, or reference guide

```js
module.exports = {
    key: 'concepts.activity-tracking',
    title: 'How activity tracking works',
    type: 'concept',
    status: 'complete',
    summary: 'Understand how activity entries appear across the system.',
    appliesTo: ['Home', 'Employees', 'Teams', 'Projects'],
    helpKey: 'concepts.activity-tracking',
    sections: [
        {
            title: 'Where activity appears',
            body: 'Activity appears on employee, team, project, and home views.',
            items: ['Employees', 'Teams', 'Projects'],
        },
    ],
};
```

## Editing rules

- Keep one guide per file.
- Use kebab-case filenames, such as `create-project.js`.
- Use `status: 'draft'` for guides that depend on incomplete or uncertain product behavior.
- Do not add screenshots until the actual image exists.
- If a future screenshot is useful, add an `image` object with a predictable path inside the related step.
- Add a folder to `SECTION_CONFIG` in `index.js` only when adding a new manual section.
