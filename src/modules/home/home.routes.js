const express = require('express');
const { requireAuth } = require('../../middleware/isAuthenticated.js');
const { renderHome } = require('./home.controller');

const router = express.Router();

router.get('/home', requireAuth, renderHome);

module.exports = router;