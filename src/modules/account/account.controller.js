/*
Title: account.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Account = require('../../models/account');
const Employee = require('../../models/employee');
const path = require('path');

const DEFAULT_ACCOUNT_IMAGE = 'https://ui-avatars.com/api/?name=Unitas%20User&background=fbfbfe&color=1f2937';
const PUBLIC_DIRECTORY = path.join(__dirname, '..', '..', 'public');

const getSessionAccountId = function getSessionAccountId(request) {
    return request.session.user?.id || '';
};

const buildFullName = function buildFullName(names, lastnames) {
    return [names, lastnames].filter(Boolean).join(' ').trim();
};

const getUploadedAccountImage = function getUploadedAccountImage(request) {
    if (!request.file) {
        return '';
    }

    return `/${path.relative(PUBLIC_DIRECTORY, request.file.path).replace(/\\/g, '/')}`;
};

const buildAccountViewModel = function buildAccountViewModel(account, employee = {}) {
    return {
        id: account.account_id,
        employeeId: account.employee_id,
        email: account.email || '',
        slackUsername: account.slack_username || '',
        image: account.image || DEFAULT_ACCOUNT_IMAGE,
        names: employee.names || '',
        lastnames: employee.lastnames || '',
        fullName: employee.full_name || buildFullName(employee.names, employee.lastnames) || 'Unitas User',
    };
};

const renderAccountForm = function renderAccountForm(request, response, account, pageTitle = 'Account', isEditing = false) {
    if (request.session.user) {
        request.session.user.username = account.names || request.session.user.username;
        request.session.user.image = account.image || '';
    }

    response.locals.layoutCurrentUser = {
        ...(response.locals.layoutCurrentUser || {}),
        name: account.names || response.locals.layoutCurrentUser?.name || 'Unitas User',
        image: account.image || '',
    };

    return response.render('pages/account', {
        csrfToken: request.csrfToken(),
        pageTitle,
        pageSubtitle: 'Signed-in user account settings.',
        account,
        isEditing,
    });
};

const fetchAccountWithEmployee = function fetchAccountWithEmployee(accountId) {
    return Account.fetchById(accountId).then(([accountRows]) => {
        if (!accountRows.length) {
            return null;
        }

        const account = accountRows[0];

        return Employee.fetchNamePartsById(account.employee_id).then(([employeeRows]) => {
            return buildAccountViewModel(account, employeeRows[0] || {});
        });
    });
};

const canEditAccount = function canEditAccount(request) {
    return request.params.account_id === getSessionAccountId(request);
};

exports.getAccount = (request, response, next) => {
    const accountId = getSessionAccountId(request);

    if (!accountId) {
        request.session.error = 'We could not identify your account.';
        return response.redirect('/home');
    }

    return fetchAccountWithEmployee(accountId)
        .then((account) => {
            if (!account) {
                request.session.error = 'We could not find your account information.';
                return response.redirect('/home');
            }

            return renderAccountForm(request, response, account);
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not load your account information right now.';
            return response.redirect('/home');
        });
};

exports.getEditAccount = (request, response, next) => {
    if (!canEditAccount(request)) {
        request.session.error = 'You can only edit your own account.';
        return response.redirect('/account');
    }

    return fetchAccountWithEmployee(request.params.account_id)
        .then((account) => {
            if (!account) {
                request.session.error = 'We could not find your account information.';
                return response.redirect('/account');
            }

            return renderAccountForm(request, response, account, 'Edit Account', true);
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not load the account editor right now.';
            return response.redirect('/account');
        });
};

exports.postEditAccount = (request, response, next) => {
    if (!canEditAccount(request)) {
        request.session.error = 'You can only edit your own account.';
        return response.redirect('/account');
    }

    const email = typeof request.body.email === 'string' ? request.body.email.trim() : '';
    const slackUsername = typeof request.body.slackUsername === 'string' ? request.body.slackUsername.trim() : '';
    const currentImage = typeof request.body.currentImage === 'string' ? request.body.currentImage.trim() : '';
    const image = getUploadedAccountImage(request) || currentImage || DEFAULT_ACCOUNT_IMAGE;
    const names = typeof request.body.names === 'string' ? request.body.names.trim() : '';
    const lastnames = typeof request.body.lastnames === 'string' ? request.body.lastnames.trim() : '';
    const fullName = buildFullName(names, lastnames);

    if (request.fileValidationError) {
        request.session.error = request.fileValidationError;
        return response.redirect(`/account/${request.params.account_id}/edit`);
    }

    if (!email || !names || !lastnames) {
        request.session.error = 'Name, last name, and email are required.';
        return response.redirect(`/account/${request.params.account_id}/edit`);
    }

    if (image.length > 1024) {
        request.session.error = 'The selected profile image is too large for the current account storage.';
        return response.redirect(`/account/${request.params.account_id}/edit`);
    }

    return fetchAccountWithEmployee(request.params.account_id)
        .then((account) => {
            if (!account) {
                request.session.error = 'We could not find your account information.';
                return response.redirect('/account');
            }

            return Employee.updateNames(account.employeeId, names, lastnames, fullName)
                .then(() => Account.updateProfile(account.id, email, slackUsername, image))
                .then(() => {
                    request.session.username = names;
                    if (request.session.user) {
                        request.session.user.username = names;
                        request.session.user.image = image;
                    }
                    request.session.success = 'Account information updated.';
                    return response.redirect('/account');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not update your account information right now.';
            return response.redirect(`/account/${request.params.account_id}/edit`);
        });
};
