/*
Title: help.routes.js
Last modification: April 20,2026
Modified by: OpenAI Codex
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const helpController = require('./help.controller');

router.get('/:key', isAuth, helpController.getHelpEntry);

module.exports = router;
