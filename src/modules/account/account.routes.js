/*
Title: account.routes.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuthenticated');

const accountController = require('./account.controller');

router.get('/', isAuth, accountController.getAccount);
router.get('/:account_id/edit', isAuth, accountController.getEditAccount);
router.post('/:account_id/edit', isAuth, accountController.postEditAccount);

module.exports = router;
