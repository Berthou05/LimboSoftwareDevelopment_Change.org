/*
Title: admin.routes.js
Last modification: March 24,2026
Modified by: Cuevas, C.
*/

const express = require('express');
const router = express.Router();

const adminController = require('./admin.controller');

router.get('/', accountController.getAdmin);
router.get('/roles', accountController.getRoles);

module.exports = router;