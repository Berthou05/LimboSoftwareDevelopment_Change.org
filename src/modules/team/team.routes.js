/*
Title: team.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const teamController = require('./team.controller');
router.get('/', isAuth,teamController.getTeam);

module.exports = router;