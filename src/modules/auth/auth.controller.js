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

const createResetToken = function createResetToken() {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
};

const getResetExpiration = function getResetExpiration() {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + RESET_TOKEN_EXPIRATION_MINUTES);
    return expirationDate;
};

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
    console.log("BODY:", request.body);
    Account.fetchByEmail(request.body.email).then(([rows,fieldData])=>{
        if(rows.length<1){
            request.session.error = 'Email not found';
            console.log("Email not found");
            return response.redirect('/');
        }else{
            bcrypt.compare(request.body.password, rows[0].password_hash).then((doMatch)=>{
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
                                image: rows[0].image || '',
                                privilege,
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

exports.getReset = (request, response, next)=>{
    return response.render('pages/reset', {
        csrfToken: request.csrfToken(),
        isLoginPage: true,
        pageTitle: 'Reset Password'
    });
}

exports.postReset = (request, response, next) => {
    const email = typeof request.body.email === 'string' ? request.body.email.trim() : '';

    if (!email) {
        request.session.error = 'Enter your account email.';
        return response.redirect('/reset');
    }

    if (!process.env.RESEND_API_KEY) {
        request.session.error = 'Email reset service is not configured.';
        return response.redirect('/reset');
    }

    return Account.fetchByEmail(email)
        .then(([accounts]) => {
            if (!accounts.length) {
                request.session.success = 'If an account exists for that email, a reset message will be sent.';
                return response.redirect('/reset');
            }

            const account = accounts[0];
            const resetToken = createResetToken();
            const resetExpiresAt = getResetExpiration();

            return Account.saveResetToken(account.account_id, resetToken, resetExpiresAt)
                .then(() => resendService.sendResetEmail(email, resetToken, RESET_TOKEN_EXPIRATION_MINUTES))
                .then(() => {
                    request.session.success = 'A password reset email has been sent.';
                    return response.redirect('/reset');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'We could not send the reset email right now.';
            return response.redirect('/reset');
        });
};
