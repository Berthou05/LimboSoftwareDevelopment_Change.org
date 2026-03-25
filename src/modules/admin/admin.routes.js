/*
Title: admin.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const adminController = require('./admin.controller');

router.get('/accounts', adminController.getAccounts);
router.get('/roles', adminController.getRoles);

module.exports = router;
