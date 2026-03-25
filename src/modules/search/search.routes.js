/*
Title: search.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const searchController = require('./search.controller');
router.get('/',isAuth, searchController.getSearch);

module.exports = router;