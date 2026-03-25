/*
Title: report.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const reportController = require('./report.controller');

router.get('/', reportController.getReport);

module.exports = router;
