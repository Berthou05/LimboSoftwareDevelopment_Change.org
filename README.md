# Unitas System
Software Requirements & Activity Intelligence Platform
Limbo Software Development

---

## Team Members

Limbo Software Development

- Rodrigo Alejandro Hurtado Cortes
- Alexis Yaocalli Berthou Haas
- Ana Camila Cuevas Gonzalez
- Alejandro Contreras Magallanes

---

## Overview

Unitas is a web-based internal productivity and reporting system designed for Change.org's development teams.

The system centralizes Daily Standup information submitted through Slack, structures it using Artificial Intelligence, and generates quarterly reports for Employees, Teams, and Projects.

The primary goal of the system is to:

- Reduce time spent gathering information for self-reviews.
- Centralize distributed work data.
- Improve visibility across teams and projects.
- Automate structured report generation.

---

## Core Features

- Slack Daily Standup ingestion
- AI-based Activity extraction
- Global search across Employees, Teams, and Projects
- Team and Project dashboards
- Report generation (Employee / Team / Project)
- PDF export of reports
- Role-Based Access Control (RBAC)

---

## Software Architecture

### Architecture Diagrams

#### Layered View

```text
+-----------------------------+
|         Web Browser         |
+-------------+---------------+
              |
              v
+-----------------------------+
|      Express Application    |
| app.js + middleware stack   |
+-------------+---------------+
              |
              v
+-----------------------------+
|      Feature Modules        |
| auth / employee / team /    |
| project / report / search   |
+-------------+---------------+
              |
              v
+-----------------------------+
|           Models            |
| SQL queries and persistence |
+-------------+---------------+
              |
              v
+-----------------------------+
|           MySQL             |
+-----------------------------+
```

#### Request/Response Flow

```text
Browser
  -> Route
  -> Middleware
  -> Controller
  -> Model
  -> Database
  -> Controller
  -> EJS View
  -> HTML Response
```

### Technology Stack

#### Backend

- Runtime: Node.js v18+
- Framework: Express.js v5.2.1
- Template Engine: EJS v4.0.1
- Body Parser: Express built-in + body-parser
- Database Access: mysql2 v3.20.0
- Session Management: express-session v1.19.0
- CSRF Protection: csurf v1.11.0
- Environment Management: dotenv v17.3.1

#### Frontend

- CSS Framework: Tailwind CSS v4.2.1
- UI Components:
  - DaisyUI v5.5.19
  - Flowbite v4.0.1
- Styling: Utility-first CSS with custom theming
- Templating Approach: Server-side rendered EJS pages and partials
- Client-side JavaScript: Vanilla JavaScript in `src/public/js`

#### Development Tools

- Package Manager: npm
- CSS CLI: Tailwind CLI v4.2.1
- Development Run Mode: `npm run dev` starts Tailwind watch mode and `node app.js`
- Version Control: Git

### 1. General Application Structure and Architectural Style

The application follows a server-side rendered web architecture built with Node.js, Express, EJS, and MySQL. Its dominant style is a layered MVC architecture, where routes receive HTTP requests, controllers coordinate use cases, models execute database queries, and EJS views render HTML for the client. In addition, the codebase uses a modular feature-oriented decomposition: business functionality is grouped into modules such as `auth`, `employee`, `team`, `project`, `report`, `search`, and `admin`. This combination allows the system to keep a clear separation between presentation, business logic, and persistence while keeping each feature relatively self-contained.

At runtime, `app.js` acts as the composition root. It configures static assets, sessions, CSRF protection, navigation middleware, and the route registration for all modules. Requests typically flow through Express middleware, into a feature route, then into a controller, then into one or more models, and finally back into an EJS page or partial that is rendered inside the shared application layout. Client-side JavaScript is intentionally lightweight and is used only for progressive enhancement of specific interface behaviors such as menus, search interactions, popup controls, and small interactive UI modules.

### 2. Functional Decomposition of the Application

The system is decomposed into functional components that map directly to the main use cases of the platform. The authentication and account management area handles login, session establishment, and role/privilege loading. The employee module supports employee profiles, activity views, and report-related context. The team module supports team directories, team details, membership, and team-related activity. The project module provides a project directory, project detail pages, project creation, collaboration membership, and views for goals, achievements, highlights, reports, teams involved, and project members. The report module contains report generation workflows and report-related routing. The search module offers directory-style and asynchronous search behavior for the main entities. Administrative and account-related routes complete the operational side of the platform.

Supporting these modules is a shared view layer under `src/views`, which is organized into page wrappers, page content, and reusable partials. Shared middleware such as `isAuthenticated` and `navigationMiddleware` provide cross-cutting concerns. The model layer contains one class per core domain entity, such as `account`, `employee`, `team`, `project`, `collaboration`, `goal`, `achievement`, `activity`, and `report`, and each model encapsulates SQL access for that domain concept. This structure makes it possible to evolve a single feature area without tightly coupling it to unrelated modules.

### 3. Interfaces Between the Software Application and External Data

The main external data interface is the MySQL database, accessed through the `mysql2` driver and a shared connection pool defined in `src/utils/database.js`. All persistent business data flows through this interface: accounts, employees, teams, projects, collaborations, activities, goals, highlights, achievements, prompts, reports, and RBAC data. Controllers do not access the database directly; instead, models act as the integration boundary and translate application requests into SQL queries.

The application also exchanges data with the web browser through standard HTTP request/response interfaces. Most interactions are HTML form submissions rendered with EJS, while some directory and detail behaviors use lightweight JSON-based fetch calls from browser scripts in `src/public/js`. Authentication state is carried through Express sessions, which means the application also depends on browser cookies as an external session interface. Configuration data such as database credentials and session secrets are injected through environment variables loaded from `.env`. Finally, the system stores references to external collaboration data, such as Slack-related fields and standup URLs, even though the current codebase mainly persists and renders that information rather than actively calling Slack APIs.

### 4. How the Architecture Supports Non-Functional Requirements

The architecture supports maintainability by separating routing, business logic, persistence, and rendering concerns, which reduces the impact of changes and makes features easier to reason about. It supports modifiability because new capabilities can be added as new modules, models, and partials without requiring a redesign of the whole application. The layered structure also improves testability and diagnosability, since each concern has a clear place: routing problems, controller logic, model queries, and view rendering can be investigated independently.

For security, the architecture includes session-based authentication, route protection through middleware, and CSRF protection for state-changing form submissions. For consistency and usability, the shared layout and partial-based view composition provide a stable interface across modules. For performance at the scale of the current system, server-side rendering with direct SQL access keeps the request pipeline simple and avoids unnecessary client complexity. Finally, the modular use of models and a normalized relational schema support data integrity and traceability, which are important for reporting, auditing, and role-based access control.

---

## First Advancement - Demonstration Video

A video demonstration of the first advancement of the project is available below.

The video includes:
- System overview
- Authentication flow
- Slack ingestion simulation
- Daily Entry storage
- Initial Activity extraction
- Basic report generation flow

### Video Link
https://drive.google.com/file/d/1mFAOzkJWy1emnwmkNC_ackoECuHdU5m-/view?usp=drivesdk

### Canva link (ANNEX of more detailed views in presentation)
https://www.canva.com/design/DAHCerMAlK4/oW1XYPKw5j2xBZIaxANlag/edit?utm_content=DAHCerMAlK4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

### SRS
Route: In git branch -> main/**documentation** -> **SRS Unitas System - Limbo SD**

### Navigable prototype
Route: In git branch -> prototype

---

## Current Advancement Status

First Advancement includes:

- Database schema implementation
- Authentication module
- Slack ingestion endpoint
- Daily Entry storage
- Basic Activity parsing
- Report structure skeleton
- Global search implementation

Pending:

- Full AI integration refinement
- Advanced report formatting
- PDF generation finalization
- UI polish
- RBAC validation

---

## License

Academic project for
Instituto Tecnologico y de Estudios Superiores de Monterrey
