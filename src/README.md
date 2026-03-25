# Unitas - Developer Documentation

> **A modern web application for team management and collaboration**  
> Developed by **Limbo Software Development**

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Development](#development)
  - [CSS Development](#css-development)
  - [Adding New Features](#adding-new-features)
- [Coding Standards](#coding-standards)

---

## System Architecture

Unitas follows a **layered MVC (Model-View-Controller)** architecture with a modular design pattern:

```
┌─────────────────────────────────────────┐
│          Client Browser                 │
└────────┬──────────────────────┬─────────┘
         │ HTTP Request         │ HTTP Response
         ▼                      │
┌─────────────────────────────────────────┐
│         Express.js Server               │
│  ┌───────────────────────────────────┐  │
│  │   Routes (URL Mapping)            │  │
│  └───────────┬───────────────────────┘  │
│              ▼                           │
│  ┌───────────────────────────────────┐  │
│  │   Middlewares (Auth, Validation)  │  │
│  └───────────┬───────────────────────┘  │
└──────────────┼──────────────────────────┘
               ▼
┌─────────────────────────────────────────┐
│     Business Logic (Modules)            │
│   Controllers + Domain Services         │
└───────────┬─────────────────────────────┘
            ▼
┌─────────────────────────────────────────┐
│      Data Layer (Models)                │
│     Database Queries & Operations       │
└───────────┬─────────────────────────────┘
            │
            ▼
     [ Database ]
            │
            │ (Data Retrieved)
            ▼
┌─────────────────────────────────────────┐
│      View Rendering (EJS)               │
│   Templates + Data → HTML               │
└───────────┬─────────────────────────────┘
            │
            └────────→ Response to Client
```

### Request Flow

1. **Client** sends HTTP request
2. **Routes** match URL to handler
3. **Middlewares** validate/authenticate request
4. **Modules** execute business logic
5. **Models** perform database operations
6. **Views** render data into HTML
7. **Response** sent back to client

### Architecture Components

- **Routes**: Define endpoints and map to controllers (`/users`, `/projects`)
- **Middleware**: Process requests before reaching controllers (auth, validation, logging)
- **Modules**: Business logic and controllers (user management, project handling)
- **Models**: Database interactions and data schemas (CRUD operations)
- **Views**: EJS templates that render dynamic HTML
- **Static Assets**: CSS, JavaScript, images served directly by Express

---

## Technology Stack

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) v18+
- **Framework**: [Express.js](https://expressjs.com/) v5.2.1
- **Template Engine**: [EJS](https://ejs.co/) v4.0.1
- **Body Parser**: Express built-in

### Frontend
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) v4.2.1
- **UI Components**: 
  - [DaisyUI](https://daisyui.com/) v5.5.19
  - [Flowbite](https://flowbite.com/) v4.0.1
- **Styling**: Utility-first CSS with custom theming

### Development Tools
- **Package Manager**: npm
- **CSS CLI**: Tailwind CLI v4.2.1
- **Hot Reload**: Node.js --watch flag
- **Version Control**: Git

---

## Project Structure

```
LimboSoftwareDevelopment_Change.org/
│
├── app.js                      # Application entry point
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── LICENSE                     # ISC License
├── .gitignore                  # Git ignore rules
│
└── src/                        # Source code directory
    │
    ├── config.js               # Configuration settings
    │
    ├── models/                 # Data models
    │   └── (database schemas)
    │
    ├── modules/                # Business logic (routes + controllers)
    │   └── (feature modules)
    │
    ├── middlewares/            # Express middlewares
    │   ├── auth.js            # Authentication
    │   ├── validation.js      # Input validation
    │   └── errorHandler.js    # Error handling
    │
    ├── views/                  # EJS templates
    │   ├── includes/          # Reusable components
    │   │   └── header.ejs     # Header component
    │   │
    │   └── pages/             # Page templates
    │       └── home.ejs       # Home page
    │
    └── public/                 # Static assets
        ├── css/
        │   ├── input.css      # Tailwind input file
        │   └── output.css     # Compiled CSS
        │
        ├── js/
        │   └── main.js        # Client-side JavaScript
        │
        └── images/            # Image assets
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Berthou05/LimboSoftwareDevelopment_Change.org.git
cd LimboSoftwareDevelopment_Change.org
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Express.js
- EJS
- Tailwind CSS and CLI
- DaisyUI
- Flowbite

---

## Running the Application

Run the application with hot-reload and CSS watch mode:

```bash
npm run dev
```

This starts the Express server on **port 3000** with:
- CSS watch mode (auto-recompiles on changes)
- Server auto-restart on file changes

Access the application at: **http://localhost:3000**

---

## Development

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start dev server with hot-reload |
| **dev:css** | `npm run dev:css` | Watch and compile CSS |
| **build:css** | `npm run build:css` | Build CSS for production |
| **start** | `npm start` | Start production server |
| **build** | `npm run build` | Build CSS + start server |

### CSS Development

Tailwind CSS is configured with custom input/output files:

- **Input**: `./src/public/css/input.css`
- **Output**: `./src/public/css/output.css`

To manually build CSS:

```bash
npm run build:css
```

#### Using DaisyUI Theme Classes

The project uses a **custom DaisyUI theme** defined in `public/css/input.css`:

**Custom Theme Colors:**
- `primary`: `#FFDB00` (Gold/Yellow)
- `secondary`: `#c8c6c7` (Gray)
- `accent`: `#ffcc00` (Light Gold)
- `base-100`: `#fbfbfe` (Background)
- `base-200`: `#f3f3f9` (Secondary Background)
- `base-300`: `#e7e7f2` (Tertiary Background)

**Using Theme Colors in Components:**

```html
<!-- Buttons with theme colors -->
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-accent">Accent Action</button>

<!-- Cards with theme background -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-primary">Title</h2>
    <p class="text-base-content">Content</p>
  </div>
</div>

<!-- Backgrounds -->
<div class="bg-base-100">Main background</div>
<div class="bg-base-200">Secondary background</div>
<div class="bg-primary text-primary-content">Primary section</div>
```

**Common DaisyUI Classes:**
- **Buttons**: `btn`, `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-link`
- **Cards**: `card`, `card-body`, `card-title`, `card-actions`
- **Forms**: `input`, `input-bordered`, `select`, `select-bordered`, `textarea`, `textarea-bordered`
- **Alerts**: `alert`, `alert-info`, `alert-success`, `alert-warning`, `alert-error`
- **Layout**: `container`, `divider`, `drawer`, `navbar`, `footer`

### Adding New Features

Follow this workflow when implementing new features:

#### 1. **Create the Model** (`models/`)
Define data structure and database operations (CRUD methods: `getAll()`, `getById()`, `create()`, `update()`, `delete()`).

#### 2. **Create the Module** (`modules/`)
Implement routes and controllers:
```javascript
const router = express.Router();
const Model = require('../models/feature.model');

router.get('/', async (req, res) => {
  const items = await Model.getAll();
  res.render('pages/list', { items });
});

module.exports = router;
```

#### 3. **Add Middleware** (optional) (`middlewares/`)
Create validation or authentication middleware if needed.

#### 4. **Create Views** (`views/pages/`)
Build EJS templates using Flowbite components, Tailwind, and DaisyUI color classes, (see [Using DaisyUI Theme Classes](#using-daisyui-theme-classes)).

#### 5. **Register Routes** (`../app.js`)
```javascript
const featureRoutes = require('./src/modules/feature.module');
app.use('/feature', featureRoutes);
```

### Development Checklist

- [ ] Model with CRUD operations
- [ ] Module with routes and controllers
- [ ] Middleware for validation/auth (if needed)
- [ ] Views using Flowbite, Tailwind and DaisyUI
- [ ] Routes registered in `app.js`
- [ ] Error handling (try-catch blocks)
- [ ] Tested in development mode

---

## Coding Standards

### Formatting

- **Indentation**: 4 spaces
- **Line length**: Max 100 characters
- **Semicolons**: Always required
- **Quotes**: Single quotes `''` for strings
- **Braces**: Required for all control structures (except single-line `if`)
- **Spacing**: Space before opening braces and around operators
- **Trailing commas**: Use in multiline arrays/objects
- **Blank lines**: No multiple consecutive blank lines

### Naming

- **Variables/Parameters**: `lowerCamelCase` (`firstName`, `totalSum`)
- **Functions/Methods**: `lowerCamelCase` verbs (`getUserData()`, `calculateTotal()`)
- **Classes/Types**: `UpperCamelCase` nouns (`UserAccount`, `DataProcessor`)
- **Constants**: `CONSTANT_CASE` (`MAX_SIZE`, `API_URL`)
- **Enums**: `UpperCamelCase` with `CONSTANT_CASE` values
- **Directories**: `lowerCamelCase` (`userManagement`, `dataProcessing`)

### Variables

```javascript
// Use const/let, one per line
const items = getItems();
const isActive = true;
let counter = 0;

// Group consts, then lets
const foo = 1;
const bar = 2;
let baz;
let qux;

// No unused variables
```

### Functions

```javascript
// Named function expressions
const myFunction = function myFunction() {
  // ...
};

// Arrow functions for callbacks
const sum = (a, b) => a + b;
items.map((item) => item.id);

// Rest parameters instead of arguments
function concatenate(...args) {
  return args.join('');
}
```

### Objects

```javascript
// Shorthand syntax
const name = 'John';
const user = { name };

// Method shorthand
const user = {
  sayHello() {
    return 'Hello';
  },
};

// Destructuring
const { name, age } = user;

// Dot notation preferred
user.name; // ✓
user['name']; // ✗
```

### Control Flow

```javascript
// Strict equality
if (value === 5) { }  // ✓
if (value == 5) { }   // ✗

// for-of for arrays
for (const item of items) { }

// Switch with default
switch (value) {
  case 1:
    break;
  default:
    break;
}
```

### Strings

```javascript
// Template literals for interpolation
const greeting = `Hello, ${name}!`;

// Single quotes
const message = 'Hello world';
```

### Comments

```javascript
// Single line comment

/*
 * Multiline comment
 * for documentation
 */

// TODO: implement feature
// FIXME: needs review
```

### Commit Conventions

Follow **Conventional Commits** standard:

```
<type>: <description>
```

**Types:**
- `FEAT`: New feature
- `FIX`: Bug fix
- `DOCS`: Documentation only
- `STYLE`: Formatting changes
- `REFACTOR`: Code restructuring
- `TEST`: Test changes
- `CHORE`: Maintenance tasks

**Rules:**
- Lowercase type
- Imperative mood ("add" not "added")
- Max 72 characters
- No period at end

**Examples:**
```
feat: add user registration endpoint
fix: correct password validation logic
docs: update API documentation
refactor: simplify authentication service
test: add unit tests for login controller
chore: update dependencies
```

---

## License

This project is licensed under the **ISC License** - see the [LICENSE](../LICENSE) file for details.