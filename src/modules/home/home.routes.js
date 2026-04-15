const express = require('express');
const router = express.Router();
const homeController = require('../home/home.controller');
const isAuth = require('../../middleware/isAuthenticated');

router.get('/', isAuth, homeController.getHome);

module.exports = router;