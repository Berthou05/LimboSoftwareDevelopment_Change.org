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
router.get('/', isAuth, teamController.getTeams);
router.post('/:team_id/toggle-membership', isAuth, teamController.toggleTeamMembership);
router.post('/:team_id/members', isAuth, teamController.addTeamMember);
router.post('/:team_id/members/:employee_id/remove', isAuth, teamController.removeTeamMember);
router.get('/:team_id', isAuth, teamController.getTeamPage);

module.exports = router;
