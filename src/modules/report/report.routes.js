/*
Title: report.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const reportController = require('./report.controller');

router.get('/', isAuth, reportController.getReport);
router.post('/generate', isAuth, reportController.);

module.exports = router;
