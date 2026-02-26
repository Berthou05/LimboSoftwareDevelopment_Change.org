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

- `app.js` - app bootstrap and middleware
- `routes/` - route grouping (auth + modules)
- `controllers/` - page/action handlers
- `data/mockData.js` - in-memory prototype data and actions
- `views/layout.ejs` - shared app shell
- `views/partials/` - reusable UI modules
- `views/auth/` and `views/pages/` - screen templates
- `public/js/main.js` - client behavior (report form filtering)

## Notes

- Report generation is simulated and stored in-memory.
- Role/privilege toggles and account updates are simulated (prototype only).
- The SRS primary color appears OCR-corrupted in extraction (`#BELE19`), so this prototype uses `#BE1E19`.
