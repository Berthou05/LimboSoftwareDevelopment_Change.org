# Modules Guide

Each feature module follows the same shape:
- `*.routes.js`: URL paths and middleware
- `*.controller.js`: request/response logic (`req`, `res`, redirects, rendering)
- `*.service.js`: data access/business helpers

## Team Rules

- Keep controllers thin: validate input, call service, render/redirect.
- Keep services simple: call repository functions and return data.
- Put shared helpers in `src/modules/shared`.
- If you add a new module router, register it in `src/modules/index.js`.
