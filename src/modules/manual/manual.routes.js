const express = require('express');
const router = express.Router();
const manualController = require('./manual.controller');
const isAuth = require('../../middleware/isAuthenticated');

router.get('/', isAuth, manualController.getManuals);

module.exports = router;
