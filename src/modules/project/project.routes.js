/*
Title: project.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const projectController = require('./project.controller');

router.get('/search', isAuth, projectController.searchProjects);
router.get('/', isAuth, projectController.getProjects);
router.post('/:project_id/toggle-membership', isAuth, projectController.toggleProjectMembership);
router.get('/:project_id', isAuth, projectController.getProjectPage);

module.exports = router;
