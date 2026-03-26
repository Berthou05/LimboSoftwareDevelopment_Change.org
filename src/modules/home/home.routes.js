/*
Title: home.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const homeController = require('./home.controller');
router.get('/',isAuth,homeController.getHome);

module.exports = router;