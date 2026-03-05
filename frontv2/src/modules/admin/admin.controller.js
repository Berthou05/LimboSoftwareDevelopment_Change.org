const {
    listAccounts,
    listRoles,
    listPrivilegesCatalog,
    setAccountRole,
    setAccountStatus,
    setRolePrivilege,
} = require('./admin.service');
const { renderModule } = require('../shared/view.util');
const { buildDateAndQuarterContext } = require('../shared/page-context.util');

const renderAccountsAdmin = function renderAccountsAdmin(req, res) {
    const roleFilter = String(req.query.role || 'all').toLowerCase();
    const statusFilter = String(req.query.status || 'all').toLowerCase();
    const allAccounts = listAccounts();

    const accounts = allAccounts.filter((account) => {
        const accountRole = String(account.role?.name || '').toLowerCase();
        const accountStatus = String(account.status || '').toLowerCase();

        const matchesRole = roleFilter === 'all' || accountRole === roleFilter;
        const matchesStatus = statusFilter === 'all' || accountStatus === statusFilter;

        return matchesRole && matchesStatus;
    });

    const { currentDateLabel, currentQuarterLabel } = buildDateAndQuarterContext();

    return renderModule(res, 'pages/accountsAdmin', {
        activeRoute: '/admin/accounts',
        pageTitle: 'Accounts Administration',
        pageSubtitle: 'Create accounts and assign roles or statuses.',
        accounts,
        totalAccounts: allAccounts.length,
        roles: listRoles(),
        currentDateLabel,
        currentQuarterLabel,
        roleFilter,
        statusFilter,
    });
};

const handleAccountRole = function handleAccountRole(req, res) {
    setAccountRole(req.params.id, req.body.roleId);

    req.session.flash = {
        type: 'success',
        message: 'Account role updated.',
    };

    return res.redirect('/admin/accounts');
};

const handleAccountStatus = function handleAccountStatus(req, res) {
    setAccountStatus(req.params.id, req.body.status);

    req.session.flash = {
        type: 'success',
        message: 'Account status updated.',
    };

    return res.redirect('/admin/accounts');
};

const renderRolesAdmin = function renderRolesAdmin(req, res) {
    return renderModule(res, 'pages/rolesAdmin', {
        activeRoute: '/admin/roles',
        pageTitle: 'Roles Administration',
        pageSubtitle: 'Toggle privileges assigned to each role.',
        roles: listRoles(),
        privilegesCatalog: listPrivilegesCatalog(),
    });
};

const handleRolePrivilege = function handleRolePrivilege(req, res) {
    setRolePrivilege(req.params.roleId, req.params.privilegeCode);

    req.session.flash = {
        type: 'success',
        message: 'Role privileges updated.',
    };

    return res.redirect('/admin/roles');
};

module.exports = {
    renderAccountsAdmin,
    handleAccountRole,
    handleAccountStatus,
    renderRolesAdmin,
    handleRolePrivilege,
};
