/*
Title: auth.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
router.get('/', authController.getLogin);
router.post('/',authController.postLogin);
router.post('/logout',authController.getLogout);
router.get('/new',authController.getSignin);
router.post('/new',authController.postSignin);


module.exports = router;