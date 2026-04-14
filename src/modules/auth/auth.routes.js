/*
Title: auth.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const authController = require('./auth.controller');
router.get('/', authController.getLogin);
router.post('/',authController.postLogin);
router.post('/logout', isAuth, authController.getLogout);
// ADMIN-03: only privileged admins can provision new accounts through this route.
router.get('/new', isAuth, isAuth.requirePermission('ADMIN-03'), authController.getSignin);
router.post('/new', isAuth, isAuth.requirePermission('ADMIN-03'), authController.postSignin);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/confirm', authController.getResetConfirm);
router.post('/reset/confirm', authController.postResetConfirm);

module.exports = router;
