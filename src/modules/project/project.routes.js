/*
Title: project.routes.js
Last modification: April 2,2026
Modified by: Alexis Berthou
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const projectController = require('./project.controller');

router.get('/search', isAuth, projectController.searchProjects);
router.get('/new', isAuth, projectController.getNewProjectPage);
router.get('/', isAuth, projectController.getProjects);
router.post('/', isAuth, projectController.createProject);
router.post('/:project_id/members', isAuth, projectController.addProjectMember);
router.post('/:project_id/members/:employee_id/remove', isAuth, projectController.removeProjectMember);
router.post('/:project_id/teams', isAuth, projectController.addProjectTeam);
router.post('/:project_id/teams/:team_id/remove', isAuth, projectController.removeProjectTeam);
router.post('/:project_id/join', isAuth, projectController.joinProject);
router.post('/:project_id/leave', isAuth, projectController.leaveProject);
router.post('/:project_id/toggle-membership', isAuth, projectController.toggleProjectMembership);
router.get('/:project_id', isAuth, projectController.getProjectPage);

module.exports = router;
