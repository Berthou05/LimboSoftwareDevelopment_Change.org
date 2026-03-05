# Team Onboarding Guide (Beginner-Friendly)

This guide explains exactly where data comes from, where logic lives, and where to edit each feature.

## 1) Big Picture: Request Flow

For almost every feature, the request flow is:

1. `Route file` receives the URL.
2. `Controller file` handles `req` and `res`.
3. `Service file` asks for data from repository.
4. `Repository file` reads/writes in-memory data.
5. Controller sends data to an `EJS view`.
6. `main.js` adds optional frontend behavior.

Concrete example for Employee detail page:

1. URL: `/employees/:id`
2. Route: `src/modules/employees/employees.routes.js`
3. Controller: `src/modules/employees/employees.controller.js` (`renderEmployeeDetail`)
4. Service: `src/modules/employees/employees.service.js`
5. Repository: `src/data/repositories/inMemory/mockData.repository.js`
6. View: `src/views/pages/employeeDetail.ejs`

## 2) File Map (Where to Look First)

- `src/server.js`: starts the app (`app.listen`).
- `src/app.js`: middleware order + router mounting.
- `src/modules/index.js`: registers all module routers.
- `src/modules/<feature>/`:
  - `*.routes.js`: URL mapping
  - `*.controller.js`: page/action logic
  - `*.service.js`: data access wrapper
- `src/data/repositories/inMemory/mockData.repository.js`: simulated database.
- `src/views/pages/*.ejs`: page templates.
- `src/views/partials/*.ejs`: reusable UI blocks.
- `src/public/js/main.js`: frontend interactive behaviors.

## 3) What Each Layer Should Contain

### Routes (`*.routes.js`)
Keep routes very small.

Should contain:
- URL patterns
- middleware (`requireAuth`, `requireAdmin`)
- controller function mapping

Should not contain:
- business logic
- data building

### Controllers (`*.controller.js`)
Controllers coordinate page/action flow.

Should contain:
- read inputs from `req.params`, `req.query`, `req.body`
- validate simple conditions
- call service functions
- set flash messages
- `res.render(...)` or `res.redirect(...)`

Should not contain:
- direct mutation of raw data collections
- repeated formatting logic that can be shared

### Services (`*.service.js`)
Services keep import paths and data access consistent.

Should contain:
- small wrappers calling repository functions
- minimal business logic

Should not contain:
- request/response logic

### Repository (`mockData.repository.js`)
Repository is the only place that should know collection structure.

Should contain:
- all in-memory arrays (`employees`, `teams`, etc.)
- read/write methods
- data shaping helpers used by services/controllers

## 4) Where Data Comes From (Exact Source)

- Users/auth: `accounts`, `employees`, `roles`
- Employees list/detail: `employees` + related `teams/projects/activities`
- Teams list/detail: `teams` + `activities` + linked employees/projects
- Projects list/detail: `projects` + `activities` + linked employees/teams
- Reports page/history: `reports`

All of these live in:
`src/data/repositories/inMemory/mockData.repository.js`

## 5) Common Task Recipes

### A) Add a new field to employee profile page

1. Add field in employee objects in repository data.
2. Ensure `buildEmployeeContext` returns it (if needed).
3. Use it in `employees.controller.js` payload.
4. Render it in `views/pages/employeeDetail.ejs`.

### B) Add a new page

1. Create `views/pages/newPage.ejs`.
2. Add controller method in target module.
3. Add route in `*.routes.js`.
4. If needed, add service/repository function.
5. Add navigation entry in `src/modules/shared/view.util.js`.

### C) Add a new report subject type

1. Extend subject source in `subject-options.service.js`.
2. Update backend report generation in repository (`generateReport`).
3. Update report form template + frontend filtering (`main.js`) if needed.

## 6) Frontend JS Guide (`src/public/js/main.js`)

Each initializer is independent:

- `initReportTypeSubjectSelects`: filters report subject dropdown by report type.
- `initEnhancedReportsSubjectSearch`: search suggestions + hidden subject id syncing.
- `initReportsDateRangePicker`: two-month date range popover and quarter shortcuts.
- `initAccountImageUpload`: preview + hidden image payload.
- `initTopbarAccountMenu`: open/close topbar account dropdown.

Important rule:
Each initializer starts by checking if required DOM nodes exist. If not, it returns immediately.
This is why one shared JS file can be used for all pages safely.

## 7) Debugging Checklist

If a page is blank or wrong:

1. Check browser console for JS errors (`main.js`).
2. Check terminal for backend errors.
3. Verify route points to expected controller.
4. Add temporary `console.log` in controller before render.
5. Confirm controller passes all template variables expected by EJS.

If login/session fails:

1. Verify session middleware is mounted before routes (`src/app.js`).
2. Verify `SESSION_SECRET` exists (or default from `src/config/env.js`).
3. Verify account credentials in repository data.

## 8) Why the Code Is Structured This Way

This project uses simple MVC-style separation so juniors can reason about changes safely:

- Routes answer: "which URL?"
- Controllers answer: "what action/page?"
- Services answer: "which data function?"
- Repository answers: "what data shape and mutation?"

When you are new, always trace bugs in that order.

## 9) Fast Start for New Team Members

1. Run app: `npm install` then `npm run dev`.
2. Sign in with demo user from `README.md`.
3. Open these three files first:
   - `src/app.js`
   - `src/modules/index.js`
   - `src/data/repositories/inMemory/mockData.repository.js`
4. Then open one feature end-to-end, for example employees:
   - `employees.routes.js` -> `employees.controller.js` -> `employees.service.js` -> `employeeDetail.ejs`

After this, the whole codebase will feel much more predictable.
