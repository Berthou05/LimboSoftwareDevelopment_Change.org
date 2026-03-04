# Unitas System Prototype

Working frontend prototype based on the SRS (`February 18, 2026`) using:
- `JavaScript`
- `Express`
- `EJS` with modular views/partials
- `Tailwind CSS` (CDN runtime config)

## Run

```bash
npm install
npm run dev
```

Default URL: `http://localhost:3001`

## Team Onboarding

- Quick onboarding guide: `docs/TEAM_ONBOARDING.md`
- Module conventions: `src/modules/README.md`

## Demo Login

- User: `rodrigo@unitas.dev`
- Password: `123456`

## Implemented SRS Screens (Section 3.2)

- `/login`
- `/recover`
- `/reset`
- `/home`
- `/employees` and `/employees/:id`
- `/teams` and `/teams/:id`
- `/projects` and `/projects/:id`
- `/reports`
- `/admin/accounts`
- `/admin/roles`
- `/account`

## Modular Structure

- `src/app.js` - express app bootstrap and route mounting
- `src/server.js` - runtime entrypoint (`app.listen`)
- `src/modules/index.js` - central router registry (easy place to add new feature routes)
- `src/modules/*` - feature-first routes, controllers, and services
- `src/data/repositories/inMemory/mockData.repository.js` - in-memory data/actions
- `src/middlewares/*` - auth, flash, and error handlers
- `src/views/layout.ejs` - shared app shell
- `src/views/partials/` - reusable UI modules
- `src/views/auth/` and `src/views/pages/` - screen templates
- `src/public/js/main.js` - client behavior (report form filtering)

## Notes

- Report generation is simulated and stored in-memory.
- Role/privilege toggles and account updates are simulated (prototype only).
- The SRS primary color appears OCR-corrupted in extraction (`#BELE19`), so this prototype uses `#BE1E19`.
