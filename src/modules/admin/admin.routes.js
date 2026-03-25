/*
Title: admin.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const adminController = require('./admin.controller');

router.get('/accounts',isAuth, adminController.getAccounts);
router.get('/roles',isAuth, adminController.getRoleAdmin);
router.delete('/roles/:roleId',isAuth,adminController.deleteRole);

module.exports = router;
