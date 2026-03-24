/*
Title: employee.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const employeeController = require('./employee.controller');
router.get('/', employeeController.getEmployee);

module.exports = router;