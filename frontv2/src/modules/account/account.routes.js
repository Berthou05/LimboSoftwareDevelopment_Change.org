const express = require('express');
const { requireAuth } = require('../../middlewares/auth.middleware');
const { renderAccount, handleAccountSave } = require('./account.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/account', renderAccount);
router.post('/account', handleAccountSave);

module.exports = router;
