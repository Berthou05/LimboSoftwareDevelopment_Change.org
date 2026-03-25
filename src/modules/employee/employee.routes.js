/*
Title: employee.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const employeeController = require('./employee.controller');
router.get('/', isAuth,employeeController.getEmployee);
router.get('/:employee_id',isAuth,employeeController.getEmployeePage);

module.exports = router;