# Manuals

Manual content is split by ownership area so each module can update its own guides.

## Files

- `shared.js`: reusable flows used by many modules
- `quickStart/`: first-use guides grouped as onboarding-style tasks
- `projects.js`, `roles.js`, `dailyEntries.js`, `reports.js`: module-specific guides
- `index.js`: registers sections and controls manual navigation grouping

## Entry shape

Each entry should keep the same structure:

```js
{
    key: 'projects.manage',
    title: 'Managing projects',
    summary: 'Short overview shown before the guide steps.',
    appliesTo: ['Projects'],
    helpKey: 'projects.manage',
    steps: [
        {
            title: 'Open the project directory',
            body: 'Explain the user action in plain language.',
            image: {
                src: '/images/manuals/projects/directory.png',
                alt: 'Projects directory page',
                caption: 'Optional caption shown below the image.',
            },
        },
    ],
}
```

## Editing rules

- Put shared behavior in `shared.js` instead of repeating it in every module guide.
- Keep one file per module area when possible so ownership stays clear.
- Every manual step must include an `image` object with a valid `src`.
- Add screenshot paths directly inside the related step once the image exists in `src/public/images/manuals`.
- Only update `index.js` when a new module file or section is added.
