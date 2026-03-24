/*
Title: auth.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
router.get('/', authController.getAuth);

module.exports = router;