/*
Title: team.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const teamController = require('./team.controller');

router.get('/search', isAuth, teamController.searchTeams);
router.get('/new', isAuth, teamController.getNewTeamPage);
router.post('/new', isAuth, teamController.createTeam);
router.post('/:team_id/update', isAuth, teamController.updateTeamInfo);
router.get('/', isAuth, teamController.getTeams);
router.post('/:team_id/toggle-membership', isAuth, teamController.toggleTeamMembership);

// Substitute this for getting members through AJAX for controller getTeamMembers
router.post('/:team_id/members', isAuth, isAuth.requirePermission('TEAM-06-02'), teamController.addTeamMember);
router.post('/:team_id/members/:employee_id/role', isAuth, isAuth.requirePermission('TEAM-07-02'), teamController.updateTeamMemberRole);
router.post('/:team_id/join', isAuth, isAuth.requirePermission('TEAM-06-01'), teamController.addTeamMember);

// Add the following line for addTeamMember
// router.post('/:team_id/join', isAuth, teamController.addTeamMember);

router.post('/:team_id/members/:employee_id/remove', isAuth, isAuth.requirePermission('TEAM-07-02'), teamController.removeTeamMember);
router.post('/:team_id/leave', isAuth, isAuth.requirePermission('TEAM-07-01'), teamController.leaveTeam);
router.delete('/:team_id/delete', isAuth, teamController.deleteTeam);
router.get('/:team_id', teamController.ensureTeamExists, isAuth, teamController.getTeamPage);

module.exports = router;
