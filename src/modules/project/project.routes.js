/*
Title: project.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const projectController = require('./project.controller');
router.get('/', isAuth,projectController.getProject);
router.delete('/project/goal/:goal_id', isAuth, projectController.deleteGoal);

module.exports = router;