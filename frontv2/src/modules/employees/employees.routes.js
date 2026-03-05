const express = require('express');
const { requireAuth } = require('../../middlewares/auth.middleware');
const { renderEmployees, renderEmployeeDetail } = require('./employees.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/employees', renderEmployees);
router.get('/employees/:id', renderEmployeeDetail);

module.exports = router;
