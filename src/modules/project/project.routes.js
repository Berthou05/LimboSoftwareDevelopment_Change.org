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
router.post('/:project_id/update', isAuth, projectController.updateProjectInfo);
router.post('/:project_id/achievements', isAuth, projectController.createAchievement);
router.post('/:project_id/achievements/:achievement_id/edit', isAuth, projectController.updateAchievement);
router.post('/:project_id/achievements/:achievement_id/remove', isAuth, projectController.deleteAchievement);
router.post('/:project_id/goals', isAuth, projectController.createGoal);
router.post('/:project_id/goals/:goal_id/edit', isAuth, projectController.updateGoal);
router.post('/:project_id/goals/:goal_id/remove', isAuth, projectController.deleteGoal);
router.post('/:project_id/highlights', isAuth, projectController.createHighlight);
router.post('/:project_id/highlights/:highlight_id/edit', isAuth, projectController.updateHighlight);
router.post('/:project_id/highlights/:highlight_id/remove', isAuth, projectController.deleteHighlight);
router.post('/:project_id/members', isAuth, isAuth.requirePermission('PROJ-05-02'), projectController.addProjectMember);
router.post('/:project_id/members/:employee_id/role', isAuth, isAuth.requirePermission('PROJ-06-02'), projectController.updateProjectMemberRole);
router.post('/:project_id/members/:employee_id/remove', isAuth, isAuth.requirePermission('PROJ-06-02'), projectController.removeProjectMember);
router.post('/:project_id/teams', isAuth, projectController.addProjectTeam);
router.post('/:project_id/teams/:team_id/remove', isAuth, projectController.removeProjectTeam);
router.post('/:project_id/join', isAuth, projectController.joinProject);
router.post('/:project_id/leave', isAuth, projectController.leaveProject);
router.post('/:project_id/toggle-membership', isAuth, projectController.toggleProjectMembership);
router.delete('/:project_id/delete', isAuth, projectController.deleteProject);
router.get('/:project_id', isAuth, projectController.getProjectPage);

module.exports = router;
