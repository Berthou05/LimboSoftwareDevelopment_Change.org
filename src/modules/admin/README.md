## Dependencies between requirements.


3. ADMIN-01, 02, 03, 04
*BE. The backend of the functionalitues of ADMIN-01, 02 and 03 is already implemented into admin.controller.*

FE 6. Creation of the  admin-roles.ejs page. Consider creation of roles popup and toggles for the additional user cases. Adapt front-end to created backend.
	BE 6. Creation of the AJAX function tgat regulates the privileges applied to a role.

---
4. ADMIN-05-06 y AUTH-01

  *BE. Backend for the render and processing of the signin form have already been created in the auth.controller*

  FE 7. Creation of the signIn.ejs form or aoth.ejs that is the signIn form page. 


## Backend requirements

---
6. ADMIN-04
In: **admin-roles.ejs**
Description: Creation of the backend function that handles the approval or cancelation of a privilege assigned to a specific role, and control the toggle.

---
7. ADMIN-05
In: **admin-accounts.ejs**
Description: Creation of the backend function that handles the update of the assignation of different roles to an account. Refer to ADMIN-05 SD for more information.

---
8. 
In: **admin-roles.ejs**
Description: All the currently developed methods related to roles in the admin.controller, require normalization of data.


## Frontend requirements

5. ADMIN 05,06
In: **admin-accounts.ejs**
Description: Creation of the admin account administration page in front-end. Make sure to add button that triggers the AUTH-01 (Creation of an Account or Sign In).
Make sure to add edit button or only make the Account Role always edditable witha  dropdown.

---
6. ADMIN-01, 02, 03,04
In: **admin-roles.ejs**
Description: Creation of the admin roles administration page in front-end. Make sure the toggles respond to the status of the called AJAX function. Consult ADMIN-04 for specifications in view.


---

# Admin Module API Contract

Esta seccion agrega la especificacion de endpoints, payloads y funcionalidades sin reemplazar el contenido historico anterior.

## Authentication and Authorization

Todas las rutas de este modulo deben pasar por:
- `isAuthenticated`
- `isAuthenticated.requirePermission(...)`

Permisos usados:
- `ADMIN-01`: consultar vistas de administracion.
- `ADMIN-02`: crear roles.
- `ADMIN-03`: eliminar roles.
- `ADMIN-04`: asignar o quitar privilegios a roles.
- `ADMIN-05`: asignar rol a cuentas.
- `ADMIN-06`: activar o desactivar cuentas.

## 1) Endpoints to Load Admin Views

### GET `/admin/accounts`

Funcionalidad:
- Renderiza la pagina `pages/admin-accounts`.
- Soporta filtros por `role` y `status`.

Permiso requerido:
- `ADMIN-01`

Query params:
- `role`: `all | employee | lead | admin`
- `status`: `all | active | disabled`

Como se pasa la informacion:
- El cliente navega por URL (SSR).
- El backend hace `response.render('pages/admin-accounts', viewModel)`.

ViewModel requerido (JSON que se pasa a la vista):
```json
{
  "csrfToken": "string",
  "pageTitle": "Accounts Administration",
  "pageSubtitle": "string",
  "roleFilter": "all",
  "statusFilter": "all",
  "totalAccounts": 0,
  "currentDateLabel": "Apr 6, 2026",
  "currentQuarterLabel": "Q2 2026",
  "roles": [
    {
      "id": "role-001",
      "name": "EMPLOYEE"
    }
  ],
  "accounts": [
    {
      "id": "a1b2c3",
      "email": "user@company.com",
      "slackUsername": "user.slack",
      "status": "ACTIVE",
      "createdAt": "2026-04-01T00:00:00.000Z",
      "roleId": "role-001",
      "employee": {
        "id": "emp-001",
        "fullName": "Jane Doe"
      }
    }
  ]
}
```

---

### GET `/admin/roles`

Funcionalidad:
- Renderiza la pagina `pages/admin-roles`.
- Muestra matriz de privilegios por rol.

Permiso requerido:
- `ADMIN-01`

Como se pasa la informacion:
- El cliente navega por URL (SSR).
- El backend hace `response.render('pages/admin-roles', viewModel)`.

ViewModel requerido (JSON que se pasa a la vista):
```json
{
  "csrfToken": "string",
  "pageTitle": "Roles Administration",
  "pageSubtitle": "string",
  "roles": [
    {
      "id": "role-001",
      "name": "EMPLOYEE",
      "privilegeCodes": ["ACC-01", "AUTH-01"]
    }
  ],
  "privilegesCatalog": [
    {
      "code": "ADMIN-04",
      "name": "Assign privileges to roles",
      "description": "string"
    }
  ]
}
```

Nota:
- Si internamente se trae `roles`, `role_privileges` y `privileges` por separado, deben normalizarse antes del render para cumplir este contrato.

## 2) Action Endpoints Required by Admin Views

### POST `/admin/accounts/:accountId/role`

Funcionalidad:
- Cambia el rol de una cuenta (dropdown en `admin-accounts`).

Permiso requerido:
- `ADMIN-05`

Como se envia:
- `application/x-www-form-urlencoded` desde `<form>`.
- O `application/json` desde `fetch`.
- Siempre incluir `_csrf`.

Body esperado:
```json
{
  "roleId": "role-002",
  "_csrf": "token"
}
```

Respuesta recomendada:
```json
{
  "success": true,
  "message": "Role updated successfully.",
  "data": {
    "accountId": "a1b2c3",
    "roleId": "role-002"
  }
}
```

---

### POST `/admin/accounts/:accountId/status`

Funcionalidad:
- Activa o desactiva una cuenta.

Permiso requerido:
- `ADMIN-06`

Body esperado:
```json
{
  "status": "ACTIVE",
  "_csrf": "token"
}
```

Respuesta recomendada:
```json
{
  "success": true,
  "message": "Status updated successfully.",
  "data": {
    "accountId": "a1b2c3",
    "status": "ACTIVE"
  }
}
```

---

### POST `/admin/roles/:roleId/:privilegeCode/toggle`

Funcionalidad:
- Activa o desactiva privilegio en la matriz de `admin-roles`.

Permiso requerido:
- `ADMIN-04`

Body esperado:
```json
{
  "_csrf": "token"
}
```

Respuesta recomendada:
```json
{
  "success": true,
  "message": "Privilege assignment updated.",
  "data": {
    "roleId": "role-001",
    "privilegeCode": "ADMIN-04",
    "enabled": true
  }
}
```

---

### POST `/admin/roles`

Funcionalidad:
- Crea un nuevo rol.

Permiso requerido:
- `ADMIN-02`

Body esperado:
```json
{
  "name": "MANAGER",
  "_csrf": "token"
}
```

Respuesta recomendada:
```json
{
  "success": true,
  "message": "Role created successfully.",
  "data": {
    "roleId": "role-999",
    "name": "MANAGER"
  }
}
```

---

### DELETE `/admin/roles/:roleId`

Funcionalidad:
- Elimina un rol.
- Debe manejar reasignacion de cuentas y eliminacion de relaciones `roleprivilege`.

Permiso requerido:
- `ADMIN-03`

Como se envia:
- `fetch` con metodo `DELETE`.
- Header `Accept: application/json`.
- Si aplica CSRF por cookie/header, enviarlo segun politica del proyecto.

Respuesta recomendada:
```json
{
  "success": true,
  "message": "Role deleted successfully.",
  "data": {
    "roleId": "role-999"
  }
}
```

## 3) Required Functionalities by View

### `admin-accounts`

Debe tener:
- Tabla de cuentas.
- Filtro por rol y estatus.
- Cambio de rol por fila.
- Cambio de estatus por fila.
- Boton para crear cuenta (flujo AUTH-01).

### `admin-roles`

Debe tener:
- Catalogo de roles.
- Catalogo de privilegios.
- Matriz rol-privilegio con toggle por celda.
- Crear rol.
- Eliminar rol.

## 4) Data Passing Rules

- Render de vistas:
  - usar `response.render(view, viewModel)` con objetos normalizados.
- Formularios:
  - `application/x-www-form-urlencoded` + `_csrf`.
- AJAX:
  - `application/json` con payload explicito.
  - respuesta JSON con forma consistente:
    - `success: boolean`
    - `message: string`
    - `data: object`
