# Modules Guide

Each feature module has the same 3-file structure:

- `*.routes.js`: declares URLs and middleware.
- `*.controller.js`: reads request data, calls services, renders/redirects.
- `*.service.js`: calls repository functions.

## Data Flow Convention

Use this trace when reading code:

1. Route receives URL.
2. Controller chooses action.
3. Service fetches/mutates data.
4. Repository performs in-memory data logic.
5. Controller passes final values to EJS template.

## Team Rules

- Keep routes tiny.
- Keep controllers explicit.
- Keep services thin.
- Keep data shape logic in repository/shared utils.
- Put reusable cross-module helpers in `src/modules/shared`.
- Register every new router in `src/modules/index.js`.

## Naming Tips

- `renderXxx`: GET page render actions.
- `handleXxx`: POST/PUT-like mutation actions.
- `listXxx` / `findXxxById`: read operations.
- `setXxx` / `toggleXxx`: write operations.
