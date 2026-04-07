/*
Title: admin.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const adminController = require('./admin.controller');

// ADMIN-01: access administration views.
router.get('/accounts', isAuth, isAuth.requirePermission('ADMIN-01'), adminController.getAccounts);
router.get('/roles', isAuth, isAuth.requirePermission('ADMIN-01'), adminController.getRoleAdmin);
// ADMIN-03: delete roles.
router.delete('/roles/:roleId', isAuth, isAuth.requirePermission('ADMIN-03'), adminController.deleteRole);
// ADMIN-02: create roles.
router.get('/roles/newRole/:name', isAuth, isAuth.requirePermission('ADMIN-02'), adminController.createRole);
router.post('/accounts/:account_id/role',isAuth, isAuth.requirePermission('ADMIN-05'), adminController.assignRole);

module.exports = router;
