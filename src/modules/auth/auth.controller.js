/*
Title: auth.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
*/

const Account = require('../../models/account');
const Employee = require('../../models/employee');
const AccountRole = require('../../models/accountRoleAssignment');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const resendService = require('../../utils/webServices/resendService');
const RESET_TOKEN_EXPIRATION_MINUTES = 8;

//------------ Auxiliar Functions -----------------

/*createResetToken 
Function responsible for the reset of a token using
crypto.*/

const createResetToken = function createResetToken() {
    return String(crypto.randomInt(100000, 1000000));
};

/*hashResetToken
Function responsible for the creation of the hash password
using crypto.*/

const hashResetToken = function hashResetToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
};

/*getResetExpiration
Function responsible for the time reset based on declaring 
the actual time plus the RESET_TOKEN_EXPIRATION_MINUTES
constant.*/

const getResetExpiration = function getResetExpiration() {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + RESET_TOKEN_EXPIRATION_MINUTES);
    return expirationDate;
};

/*getPasswordValidationError
Auxiliar function responsible for the validation of the given
password, given the following conditions:
- Min. length 8 characters.
- At least 1 Upper Case
- At least 1 Number
- At least 1 Special Character*/

const getPasswordValidationError = function getPasswordValidationError(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters.';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must include at least one uppercase letter.';
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must include at least one number.';
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return 'Password must include at least one special character.';
    }

    return '';
};

/*maskEmail(email)
Function responsible for the validation of the given email.*/

const maskEmail = function maskEmail(email) {
    const [name, domain] = email.split('@');

    if (!name || !domain) {
        return email;
    }

    const visibleName = name.length <= 2 ? name[0] : name.slice(0, 2);
    return `${visibleName}***@${domain}`;
};

/*renderResetConfirmPage(request, response, {email = request.session.resetEmail || '',prefilledToken = '',statusCode = 200,} 
Function responsible for rendeing the confirmation of the password 
modification request*/

const renderResetConfirmPage = function renderResetConfirmPage(request, response, {
    email = request.session.resetEmail || '',
    prefilledToken = '',
    statusCode = 200,
} = {}) {
    return response.status(statusCode).render('pages/resetConfirm', {
        csrfToken: request.csrfToken(),
        isLoginPage: true,
        pageTitle: 'Confirm Reset',
        resetEmail: email,
        maskedResetEmail: email ? maskEmail(email) : '',
        prefilledToken,
    });
};

//------------ Main Functions -----------------

/*getSignin
Function that renders the sign in form.
Only avaible with privilege ADMIN-03*/

exports.getSignin=(request, response, next) => {
    return response.render('signin', {
        csrfToken: request.csrfToken(),
    });
}

/*postSignin
Function responsible for handling the employee, account creation,
and role assignation.
Only avaible with privilege ADMIN-03*/

exports.postSignin=(request, response, next) => {
    const fullname = request.body.name+" "+request.body.lastname;
    const employee = new Employee(fullname, request.body.names, request.body.lastnames);
    const employee_id = '';
    const account_id = '';
    employee.save().then(()=>{
        employee_id=Employee.getEmployeeIdByFullname(fullname);
        const account = new Account(employee_id, request.body.email, request.body.password, request.body.slack_username);
        account.save().then(()=>{
            account_id = Account.getAccountIdByEmailSlack(request.body.email, request.body.slack_username);
            const accountRole = new AccountRole(account_id, request.body.role_id);
            accountRole.save().then(()=>{
                return response.redirect('/accountAdmin');
            })
            .catch((error)=>{
                console.log(error);
                return response.redirect('/');
            })
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/');
    })
};

/*getLogin
Function responsible for rendering login page.
Available without authentication*/

exports.getLogin = (request, response, next)=>{
    return response.render('pages/login', {
        csrfToken: request.csrfToken(),
        isLoginPage: true,
        pageTitle: 'Login'
    });
}

/*postLogin
Function responsible for processing the login form information
validation: existance of account, password matching, privilege loading.
Available without authentication*/

exports.postLogin = (request, response, next)=>{
    const email = typeof request.body.email === 'string' ? request.body.email.trim() : '';
    const password = request.body.password;

    Account.fetchByEmail(email).then(([rows,fieldData])=>{
        if(rows.length<1){
            request.session.error = 'Email not found';
            return response.redirect('/');
        }else if(rows[0].status == 'DISABLED'){
            request.session.error = 'Disabled Account. Login is not possible. Please contact the System Administrator';
            return response.redirect('/');
        }else{
            bcrypt.compare(password, rows[0].password_hash).then((doMatch)=>{
                if(doMatch){
                    request.session.isAuth = true;
                    request.session.isLoggedIn = true;
                    request.session.employeeId = rows[0].employee_id;
                    Employee.getNamesByEmployeeId(rows[0].employee_id).then(([employeeRows])=>{
                        request.session.username = employeeRows[0]?.names || '';

                        Account.getPrivilegesFromAccountId(rows[0].account_id).then(([privileges, fieldData])=>{
                            const privilege = {};
                            (Array.isArray(privileges) ? privileges : []).forEach((row) => {
                                const privilegeId = String(row.privilege_id || '').trim().toUpperCase();
                                if (!privilegeId) {
                                    return;
                                }
                                privilege[privilegeId] = true;
                            });

                            // Canonical session payload for authorization and identity.
                            request.session.user = {
                                id: rows[0].account_id,
                                employeeId: rows[0].employee_id,
                                username: request.session.username || '',
                                image:rows[0].image || '',
                                privilege,
                                fullName: rows[0].full_name || '',
                                name: rows[0].names || ''
                            };

                            request.session.success = 'Welcome back.';
                            return request.session.save((error) => {
                                if (error) {
                                    console.log(error);
                                    request.session.error = 'We could not log you in right now.';
                                    request.session.success = '';
                                    return response.redirect('/');
                                }
                                return response.redirect('/home');
                            });

                        })
                        .catch((error)=>{
                            console.log(error);
                            request.session.error = 'We could not log you in right now.';
                            return response.redirect('/');
                        })

                    })
                    .catch((error)=>{
                        console.log(error);
                        request.session.error = 'We could not log you in right now.';
                        return response.redirect('/');
                    })                        
                        
                } else {
                    request.session.error = 'Password does not match';
                    console.log("Password does not match");
                    return response.redirect('/');
                }
            })
            .catch((error)=>{
                console.log(error);
                request.session.error = 'We could not log you in right now.';
                return response.redirect('/');
            });
        };
    })
    .catch((error)=>{
        console.log(error);
        request.session.error = 'We could not log you in right now.';
        return response.redirect('/');
    });
}

/*getLogout
Function responsible for logout the current session.
Only available for authenticated users.*/

exports.getLogout = (request, response, next)=>{
    request.session.destroy(() => {
        return response.redirect('/');
    });
}

/*getReset
FUnction responsible for rendering the reset password page.*/

exports.getReset = (request, response, next)=>{
    request.session.resetEmail = null;

    return response.render('pages/reset', {
        csrfToken: request.csrfToken(),
        isLoginPage: true,
        pageTitle: 'Reset Password'
    });
}

/*postReset
Function responsible for handling the validation of an email
related to an account, its validation and the token 
configuration and email submittion of the code, to redirect to
the confirmation render.*/

exports.postReset = (request, response, next) => {
    const email = typeof request.body.email === 'string' ? request.body.email.trim() : '';

    if (!email) {
        request.session.error = 'Enter your account email.';
        return response.redirect('/reset');
    }

    return Account.fetchByEmail(email)
        .then(([accounts]) => {
            if (!accounts.length) {
                request.session.resetEmail = email;
                response.locals.flash = {
                    type: 'success',
                    message: 'If an account exists for that email, a reset message will be sent.',
                };

                return renderResetConfirmPage(request, response, { email });
            }

            if (!process.env.RESEND_API_KEY) {
                request.session.error = 'Email reset service is not configured.';
                return response.redirect('/reset');
            }

            const account = accounts[0];
            const resetToken = createResetToken();
            const resetTokenHash = hashResetToken(resetToken);
            const resetExpiresAt = getResetExpiration();

            return Account.saveResetToken(account.account_id, resetTokenHash, resetExpiresAt)
                .then(() => {
                    return resendService.sendResetEmail(email, resetToken, RESET_TOKEN_EXPIRATION_MINUTES)
                        .catch((error) => {
                            return Account.clearResetToken(account.account_id)
                                .catch(() => {})
                                .then(() => {
                                    throw error;
                                });
                        });
                })
                .then(() => {
                    request.session.resetEmail = email;
                    request.session.success = 'If there is an account associated password reset email has been sent.';
                    return response.redirect('/reset/confirm');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not send the reset email right now.';
            return response.redirect('/reset');
        });
};

/*getResetConfirm
Function responsible for rendering the confirmation page
to insert the given email token.*/

exports.getResetConfirm = async (request, response, next) => {
    const token = request.query.token;
    let prefilledToken = '';

    if (token) {
        prefilledToken = token;
        const tokenHash = hashResetToken(token);

        try {
            const [accounts] = await Account.fetchByEmailAndResetToken(null, tokenHash);
            if (accounts.length) {
                request.session.resetEmail = accounts[0].email;
            }
        } catch (error) {
            console.log('Error fetching account by token:', error);
        }
    }

    if (!request.session.resetEmail && !token) {
        request.session.error = 'Request a reset code first.';
        return response.redirect('/reset');
    }

    return renderResetConfirmPage(request, response, {
        email: request.session.resetEmail || '',
        prefilledToken,
    });
};

/*postResetConfirm
Function responsible for handling the obtention of the given 
token within the specified time rate, its validation and
the setting of the password.*/

exports.postResetConfirm = (request, response, next) => {
    const email = request.session.resetEmail || '';
    const token = typeof request.body.token === 'string' ? request.body.token.trim() : '';
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;

    if (!email) {
        request.session.error = 'Request a reset code first.';
        return response.redirect('/reset');
    }

    if (!token || !password || !confirmPassword) {
        request.session.error = 'Complete all fields.';
        return response.redirect('/reset/confirm');
    }

    if (password !== confirmPassword) {
        request.session.error = 'Password does not meet the requirements.';
        return response.redirect('/reset/confirm');
    }

    const passwordError = getPasswordValidationError(password);
    if (passwordError) {
        request.session.error = 'Password does not meet the requirements.';
        return response.redirect('/reset/confirm');
    }

    const tokenHash = hashResetToken(token);

    return Account.fetchByEmailAndResetToken(email, tokenHash)
        .then(([accounts]) => {
            if (!accounts.length) {
                request.session.error = 'Invalid reset code.';
                return response.redirect('/reset/confirm');
            }

            const account = accounts[0];
            const expiresAt = account.reset_token_expires_at ? new Date(account.reset_token_expires_at) : null;

            if (expiresAt && expiresAt < new Date()) {
                return Account.clearResetToken(account.account_id)
                    .then(() => {
                        request.session.resetEmail = null;
                        request.session.error = 'Reset code has expired. Request a new one.';
                        return response.redirect('/reset');
                    });
            }

            return bcrypt.hash(password, 12)
                .then((passwordHash) => {
                    return Account.updatePasswordAndClearResetToken(account.account_id, passwordHash);
                })
                .then(() => {
                    request.session.resetEmail = null;
                    request.session.success = 'Your password has been changed.';
                    return response.redirect('/');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not reset your password right now.';
            return response.redirect('/reset/confirm');
        });
};
