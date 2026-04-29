/*
Title: account.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Account = require('../../models/account');
const Employee = require('../../models/employee');
const renderNotFound = require('../../utils/renderNotFound');
const { DEFAULT_AVATAR, resolveAvatarImage } = require('../../utils/avatar.util');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '..', '..', 'public');

//--------------------- Auxiliar Functions ------------------------

/*getSessionAccountId(request)
Function responsible for getting the actual user id*/

const getSessionAccountId = function getSessionAccountId(request) {
    return request.session.user?.id || '';
};

/*buildFullName(names, lastnames)
Function responsible for assembling the names and lastnames of
the account*/

const buildFullName = function buildFullName(names, lastnames) {
    return [names, lastnames].filter(Boolean).join(' ').trim();
};

/*getUploadedAccountImage(request)
Function responsible for getting the file information and redeclaring
the actual path of it to include it into the system or return ''*/

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
        image: resolveAvatarImage(account.image),
        defaultImage: DEFAULT_AVATAR,
        names: employee.names || '',
        lastnames: employee.lastnames || '',
        fullName: employee.full_name || buildFullName(employee.names, employee.lastnames) || 'Unitas User',
    };
};

/*renderAccountForm(request, response, account, pageTitle = 'Account', isEditing = false)
Function responsible for rendering the visualization and edition 
page of the given account ans return it to the given response*/

const renderAccountForm = function renderAccountForm(request, response, account, pageTitle = 'Account', isEditing = false) {
    if (request.session.user) {
        request.session.user.username = account.names || request.session.user.username;
        request.session.user.image = account.image || '';
    }

    response.locals.layoutCurrentUser = {
        ...(response.locals.layoutCurrentUser || {}),
        name: account.names || response.locals.layoutCurrentUser?.name || 'Unitas User',
        image: resolveAvatarImage(account.image),
    };

    return response.render('pages/account', {
        csrfToken: request.csrfToken(),
        pageTitle,
        pageSubtitle: 'Signed-in user account settings.',
        account,
        isEditing,
    });
};

/*fetchAccountWithEmployee(accountId)
Function responsible for obtaining the employee information from a given 
account_id.*/

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

/*canEditAccount(request)
Function responsible for returning a bool that confirms the actual system user
is the owwer of the account, and therefore has edition privileges*/

const canEditAccount = function canEditAccount(request) {
    return request.params.account_id === getSessionAccountId(request);
};

//--------------------- Main Functions ------------------------

/*ensureAccountExists
Function responsible for proving the existance of the account
of the actual user.*/

exports.ensureAccountExists = (request, response, next) => {
    return Account.fetchById(request.params.account_id)
        .then(([accountRows]) => {
            if (!accountRows.length) {
                return renderNotFound(request, response);
            }

            return next();
        })
        .catch(next);
};

/*getAccount
Function responsible for rendering the page of the account
of the actual user using the auxiliar function renderAccountForm
and making validations and error handling.*/

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

/*getEditAccount
Function responsible for getting the edition form for the account
making a new render with renderAccountForm*/

exports.getEditAccount = (request, response, next) => {
    if (!canEditAccount(request)) {
        return renderNotFound(request, response);
    }

    return fetchAccountWithEmployee(request.params.account_id)
        .then((account) => {
            if (!account) {
                return renderNotFound(request, response);
            }

            return renderAccountForm(request, response, account, 'Account', true);
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not load the account editor right now.';
            return response.redirect('/account');
        });
};

/*postEditAccount
Function responsible for handling the edition and modification of
fields of an account, making fields validation, error handling and
modifications to database.*/

exports.postEditAccount = (request, response, next) => {
    if (!canEditAccount(request)) {
        return renderNotFound(request, response);
    }

    const email = typeof request.body.email === 'string' ? request.body.email.trim() : '';
    const slackUsername = typeof request.body.slackUsername === 'string' ? request.body.slackUsername.trim() : '';
    const currentImage = typeof request.body.currentImage === 'string' ? request.body.currentImage.trim() : '';
    const image = getUploadedAccountImage(request) || currentImage || '';
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
                return renderNotFound(request, response);
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
