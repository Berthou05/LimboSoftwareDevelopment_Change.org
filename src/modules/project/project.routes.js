/*
Title: project.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const projectController = require('./project.controller');
router.get('/', projectController.getProject);

module.exports = router;