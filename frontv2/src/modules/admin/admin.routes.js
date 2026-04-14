const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/auth.middleware');
const {
    renderAccountsAdmin,
    renderCreateAccountAdmin,
    handleCreateAccountAdmin,
    handleAccountRole,
    handleAccountStatus,
    renderRolesAdmin,
    handleRolePrivilege,
} = require('./admin.controller');

const router = express.Router();

router.use(requireAuth);
router.use(requireAdmin);

router.get('/admin/accounts', renderAccountsAdmin);
router.get('/admin/accounts/create', renderCreateAccountAdmin);
router.post('/admin/accounts/create', handleCreateAccountAdmin);
router.post('/admin/accounts/:id/role', handleAccountRole);
router.post('/admin/accounts/:id/status', handleAccountStatus);

router.get('/admin/roles', renderRolesAdmin);
router.post('/admin/roles/:roleId/:privilegeCode/toggle', handleRolePrivilege);

module.exports = router;
