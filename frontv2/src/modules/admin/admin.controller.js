const {
    listAccounts,
    listRoles,
    listPrivilegesCatalog,
    createManagedAccount,
    setAccountRole,
    setAccountStatus,
    setRolePrivilege,
} = require('./admin.service');
const { renderModule } = require('../shared/view.util');
const { buildDateAndQuarterContext } = require('../shared/page-context.util');

const CREATE_ACCOUNT_ERROR_MESSAGES = {
    MISSING_FIELDS: 'Full name, email, password, and role are required.',
    INVALID_REFERENCE: 'Selected role is invalid.',
    EMAIL_ALREADY_EXISTS: 'Email is already in use.',
    SLACK_ALREADY_EXISTS: 'Slack username is already in use.',
};

const buildCreateAccountFormData = function buildCreateAccountFormData(body = {}) {
    return {
        fullName: String(body.fullName || '').trim(),
        email: String(body.email || '').trim().toLowerCase(),
        password: String(body.password || '').trim(),
        slackUsername: String(body.slackUsername || '').trim(),
        roleId: String(body.roleId || 'role-user').trim(),
        image: String(body.image || '').trim(),
    };
};

const renderCreateAccountPage = function renderCreateAccountPage(res, overrides = {}) {
    const roles = listRoles();
    const defaultRoleId = roles.find((role) => role.id === 'role-user')?.id || roles[0]?.id || '';
    const formData = {
        fullName: '',
        email: '',
        password: '',
        slackUsername: '',
        roleId: defaultRoleId,
        image: '',
        ...(overrides.formData || {}),
    };

    return renderModule(res, 'pages/createAccount', {
        activeRoute: '/admin/accounts',
        pageTitle: 'Create Account',
        pageSubtitle: 'Create a new account and assign role settings.',
        roles,
        formData,
    });
};

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

const renderCreateAccountAdmin = function renderCreateAccountAdmin(req, res) {
    const draftFormData = req.session.createAccountDraft || null;
    req.session.createAccountDraft = null;

    return renderCreateAccountPage(res, {
        formData: draftFormData || {},
    });
};

const handleCreateAccountAdmin = function handleCreateAccountAdmin(req, res) {
    const formData = buildCreateAccountFormData(req.body);
    const creationResult = createManagedAccount(formData);

    if (!creationResult.ok) {
        req.session.createAccountDraft = {
            ...formData,
            password: '',
            image: '',
        };
        req.session.flash = {
            type: 'danger',
            message: CREATE_ACCOUNT_ERROR_MESSAGES[creationResult.reason] || 'Could not create account.',
        };

        return res.redirect('/admin/accounts/create');
    }

    req.session.flash = {
        type: 'success',
        message: 'Account created successfully.',
    };

    return res.redirect('/admin/accounts');
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
    renderCreateAccountAdmin,
    handleCreateAccountAdmin,
    handleAccountRole,
    handleAccountStatus,
    renderRolesAdmin,
    handleRolePrivilege,
};
