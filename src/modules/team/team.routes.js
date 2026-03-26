/*
Title: team.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const teamController = require('./team.controller');
router.get('/', isAuth, teamController.getTeams);
router.get('/:team_id', isAuth, teamController.getTeamPage);

module.exports = router;