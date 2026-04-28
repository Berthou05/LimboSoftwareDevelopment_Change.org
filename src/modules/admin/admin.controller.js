/*
Title: admin.controller.js
Last modification: April 6,2026
Modified by: Hurtado, R.
*/

const Role = require('../../models/role');
const RolePrivilege = require('../../models/rolePrivilegeAssignment');
const Privilege = require('../../models/privilege');
const AccountRole = require('../../models/accountRoleAssignment');
const Account = require('../../models/account');
const Employee = require('../../models/employee');
const resendService = require('../../utils/webServices/resendService');
const crypto = require('crypto');
const path = require('path');
const { DEFAULT_AVATAR } = require('../../utils/avatar.util');

const PUBLIC_DIRECTORY = path.join(__dirname, '..', '..', 'public');
const RESET_TOKEN_EXPIRATION_MINUTES = 8;

//------------ Auxiliar Functions -----------------

/*formatDateLabel
Function responsible for transforming a datetime in Date object
format to a manageable month/day/year format*/

const formatDateLabel = function (value, fallback = '') {
    if (!value) return fallback;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/*getUploadedAccountImage
Function responsible for the obtention of the account image.*/

const getUploadedAccountImage = (request) => {
    if (!request.file) return '';
    return `/${path
        .relative(PUBLIC_DIRECTORY, request.file.path)
        .replace(/\\/g, '/')}`;
};

/*buildCreateAccountFormData
Function responsible for keeping safe default values when the create
account form is rendered after a failed submission.*/

const buildCreateAccountFormData = (formData = {}) => ({
    names: formData.names || '',
    lastnames: formData.lastnames || '',
    email: formData.email || '',
    slackUsername: formData.slackUsername || '',
    roleId: formData.roleId || '',
    image: formData.image || DEFAULT_AVATAR,
});

/*parseEmployeeNameParts
Function responsible for keeping employee names normalized before
employee/account creation.*/

const parseEmployeeNameParts = (names, lastnames) => {
    const normalizedNames = names.trim().replace(/\s+/g, ' ');
    const normalizedLastnames = lastnames.trim().replace(/\s+/g, ' ');

    return {
        names: normalizedNames,
        lastnames: normalizedLastnames,
        fullName: `${normalizedNames} ${normalizedLastnames}`.trim(),
    };
};

/*getBaseUrl
Function responsible for building links used in transactional emails.*/

const getBaseUrl = (request) => `${request.protocol}://${request.get('host')}`;

const ACCOUNTS_PER_PAGE = 8;

//------------------- Main Functions --------------------

/*getAccounts
Function responsible for the render of the Accounts Administration
page, making data obtention, normalization and render.*/

exports.getAccounts = (request, response, next) => {
    const roleFilter = request.query.role || 'all';
    const statusFilter = request.query.status || 'active';
    const requestedPage = parseInt(request.query.page, 10);
    const currentPage = requestedPage > 0 ? requestedPage : 1;
    const offset = (currentPage - 1) * ACCOUNTS_PER_PAGE;

    Promise.all([
        Account.fetchAll(roleFilter, statusFilter, ACCOUNTS_PER_PAGE, offset),
        Account.countAll(roleFilter, statusFilter),
        Role.fetchAll(),
    ])
        .then(([[accounts], [totalAccounts], [roles]]) => {
            const total = totalAccounts[0].count;
            const totalPages = Math.max(Math.ceil(total / ACCOUNTS_PER_PAGE), 1);

            // Keep manually entered page numbers inside the available result range.
            if(currentPage > totalPages){
                return response.redirect(`/admin/accounts?role=${encodeURIComponent(roleFilter)}&status=${encodeURIComponent(statusFilter)}&page=${totalPages}`);
            }

            return response.render('pages/admin-accounts', {
                csrfToken: request.csrfToken(),
                pageTitle: 'Accounts Administration',
                pageSubtitle:
                    'Page responsible for the visualization, edition and deletion of accounts of the Unitas System',
                totalAccounts: total,
                accounts: accounts.map((account) => ({
                    id: account.account_id,
                    employee: {
                        fullName: account.full_name,
                    },
                    email: account.email,
                    slackUsername: account.slack_username,
                    status: account.status,
                    createdAt: formatDateLabel(account.created_at),
                    roleId: account.role_id,
                })),
                roles: roles.map((role) => ({
                    id: role.role_id,
                    name: role.name,
                })),
                statusFilter,
                roleFilter,
                currentPage,
                totalPages,
            });
        })
        .catch((error) => {
            console.log(error);
            request.flash('error', error);
            return response.redirect('/home');
        });
};

/*assignRole
Function responsible for handling the AJAX assignation of a
role to an account.*/

exports.assignRole = (request, response, next) => {
    const accountId = request.params.account_id;
    const roleId = request.body.roleId;

    AccountRole.countActiveAdminsExcluding(accountId)
        .then(([count]) => {
            if (count[0].admin_count <= 0) {
                return response
                    .status(409)
                    .json({ error: 'At least one Admin account is required.' });
            }

            return AccountRole.updateRole(accountId, roleId)
                .then(() => AccountRole.fetchRoleByAccount(accountId))
                .then(([rows]) => {
                    return response.status(200).json({
                        success: true,
                        message: 'Role updated successfully.',
                        data: {
                            account_id: rows[0].account_id,
                            role_name: rows[0].name,
                        },
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return response
                .status(500)
                .json({ error: 'Role could not be updated right now.' });
        });
};

/*assignStatus
Function responsible for handling the AJAX assignation of a
status to an account. Activation or deactivation of the
account.*/

exports.assignStatus = (request, response, next) => {
    const accountId = request.params.account_id;
    const status = request.body.status;

    AccountRole.countActiveAdminsExcluding(accountId)
        .then(([count]) => {
            if (count[0].admin_count <= 0) {
                return response
                    .status(409)
                    .json({ error: 'At least one Admin account is required.' });
            }

            return Account.updateStatus(status, accountId)
                .then(() => Account.fetchById(accountId))
                .then(([rows]) => {
                    return response.status(200).json({
                        success: true,
                        message: 'Status updated successfully.',
                        data: {
                            account_id: rows[0].account_id,
                            status: rows[0].status,
                        },
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return response
                .status(500)
                .json({ error: 'Status could not be updated.' });
        });
};

/*getRoleAdmin
Function responsible for the page render of the Role Administration page*/

exports.getRoleAdmin = (request, response, next) => {
    Role.fetchAllWithPrivileges().then(([rolesInfo,fieldData])=>{
        Privilege.fetchAll().then(([privileges, fieldData])=>{

            const rolesMap = {};

            rolesInfo.forEach(row => {
                if (!rolesMap[row.role_id]) {
                    rolesMap[row.role_id] = {
                        id: row.role_id,
                        name: row.name,
                        privilegeCodes: []
                    };
                }

                if (row.privilege_id) {
                    rolesMap[row.role_id].privilegeCodes.push(row.privilege_id);
                }
            });

            const roles = Object.values(rolesMap);

            const privilegesCatalog = privileges.map((privilege)=>({
                code:privilege.privilege_id || 'Unknown id',
                name: privilege.name || 'Unknown name',
                description: privilege.description || ''
            }))

            return response.render('pages/admin-roles',{
                pageTitle: 'Roles Administration',
                pageSubtitle: 'Page responsible for the role and privilege administration',
                csrfToken: request.csrfToken(),
                roles: roles, 
                privilegesCatalog:privilegesCatalog,
            });
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/home');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/home');
    })
};


/*deleteRole
Function responsible for a role deletion including:
AccountRole tuples update, RolePrivilege tuples deletion and Role deletion*/

exports.deleteRole = (request, response, next) =>{
    Role.fetchNameById(request.params.roleId).then(([role_name,fieldData])=>{
        if(role_name[0].name === 'ADMIN'){
            return response.json({
                type: 'error',
                message: 'ADMIN role can not be deleted'
            });
            }
        else if(role_name[0].name === 'EMPLOYEE'){
            return response.json({
                type: 'error',
                message: 'EMPLOYEE role can not be deleted'
            });
        }
        else{
            AccountRole.updateByRole(request.params.roleId).then(()=>{
                RolePrivilege.deleteByRoleId(request.params.roleId).then(()=>{
                    Role.delete(request.params.roleId).then(()=>{
                        return response.json({
                            type:'success',
                            message: `The Role with name ${role_name[0].name} was succesfully deleted`
                        });
                    })
                    .catch((error)=>{
                        console.log(error);
                        return response.json({
                            type: 'error',
                            message: 'Role deletion failed'
                        });
                    })
                })
                .catch((error)=>{
                    console.log(error);
                    return response.json({
                        type: 'error',
                        message: 'Role - Privilege relations deletion failed'
                    });
                })
            })
            .catch((error)=>{
                console.log(error);
                return response.json({
                    type: 'error',
                    message: 'Association accounts could not be reassigned to Employee'
                });
            })
        }
    }).catch((error)=>{
        return response.json({
            type: 'error',
            message: 'Role Name could not be found'
        });
    })    
};


/*createRole
Function responsible for the role creation and redirect to
roleAdministration page render*/

exports.createRole = (request, response, next)=>{
    const roleName = request.body.name;

    if (!roleName || roleName.trim() === "") {
        return response.json({
            type: 'error',
            message: `Role name is required.`
        });
    }

    if (roleName && roleName.length > 100) {
        return response.json({
            type: 'error',
            message: `The Role name must be 100 characters or less.`
        });
    }

    Role.compareName(roleName).then(([sameName, fielName])=>{
        if(sameName.length < 1){
            const role = new Role(roleName);

            role.save().then(()=>{
                return response.json({
                    type: 'success',
                    message: `The Role was created successfully`
                });
            })
            .catch((error)=>{
                console.log(error);
                return response.json({
                    type: 'error',
                    message: `The Role could not be created`
                });
            })
        }
        else{
            return response.json({
                type: 'error',
                message: `The Role name already exists. Type a different one.`
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        return response.json({
            type: 'error',
            message: `Role name comparison could not be performed. Try again`
        });
    })
};

/*AssignPrivilege
Function responsible for returning a status response that changes or 
maintains the intentioned toggle*/

exports.AssignPrivilege = (request,response,next)=>{
    const roleId = request.params.role_id; 
    const privilegeId = request.params.privilege_id;
    RolePrivilege.fetchByRoleAndPrivilege(roleId, privilegeId).then(([count,fieldData])=>{
        if(count[0].privilege_count>0){
            RolePrivilege.delete(roleId,privilegeId).then(()=>{
                return response.status(200).json({enabled:false});
            })
            .catch((error)=>{
                console.log(error);
                return response.status(500).json({message: 'Privilege cound not be deleted from Role'});
            })
        }
        else{
            const privilegeRole = new RolePrivilege(roleId, privilegeId);
            privilegeRole.save().then(()=>{
                return response.status(200).json({enabled:true});
            })
            .catch((error)=>{
                console.log(error);
                return response.status(500).json({message: 'Privilege cound not be added to Role'});
            })
        }
    })
    .catch((error)=>{
        console.log(error);
        return response.status(500).json({message: 'Privilege/Role invalid'});
    })
}

/*getCreateAccount
Function responsible for rendering the page of account creation
in the Account Administration page.*/

exports.getCreateAccount = (request, response, next) => {
    const storedFormData = buildCreateAccountFormData(
        request.session.createAccountFormData
    );
    delete request.session.createAccountFormData;

    Role.fetchAll()
        .then(([roles]) => {
            return response.render('pages/admin-createAccount', {
                csrfToken: request.csrfToken(),
                pageTitle: 'Create Account',
                pageSubtitle:
                    'Page responsible for the creation of accounts in the Unitas System',
                roles: roles.map((role) => ({
                    id: role.role_id,
                    name: role.name,
                })),
                formData: storedFormData,
            });
        })
        .catch((error) => {
            console.log(error);
            request.session.error =
                'We could not load the create account view right now.';
            return response.redirect('/admin/accounts');
        });
};

/*postCreateAccount
Function responsible for handling the creation of a new account, including:
data validation, normalization and storage management with error handling*/

exports.postCreateAccount = async (request, response, next) => {
    if (request.fileValidationError) {
        request.session.error = request.fileValidationError;
        return response.redirect('/admin/accounts/create');
    }

    const uploadedImage = getUploadedAccountImage(request);
    const image = uploadedImage || DEFAULT_AVATAR;

    console.log('Uploaded file:', request.file);
    console.log('Final image value:', image);

    const formData = {
        names: String(request.body.names || '').trim(),
        lastnames: String(request.body.lastnames || '').trim(),
        email: String(request.body.email || '').trim(),
        password: String(request.body.password || ''),
        confirmPassword: String(request.body.confirmPassword || ''),
        slackUsername: String(request.body.slackUsername || '').trim(),
        roleId: String(request.body.roleId || '').trim(),
        image: image,
    };

    request.session.createAccountFormData =
        buildCreateAccountFormData(formData);

    // Data validation

    if (
        !formData.names ||
        !formData.lastnames ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.roleId
    ) {
        request.session.error =
            'Names, last names, email, password, confirm password, and role are required.';
        return response.redirect('/admin/accounts/create');
    }

    if (image.length > 1024) {
        request.session.error = 'The selected profile image is too large.';
        return response.redirect('/admin/accounts/create');
    }

    if (formData.password.length < 6) {
        request.session.error = 'Password must be at least 6 characters long.';
        return response.redirect('/admin/accounts/create');
    }

    if (formData.password !== formData.confirmPassword) {
        request.session.error =
            'Password and confirm password must match.';
        return response.redirect('/admin/accounts/create');
    }

    try {
        // Handling duplications

        const [existingEmailRows] = await Account.fetchByEmail(
            formData.email
        );
        if (existingEmailRows.length > 0) {
            request.session.error =
                'An account with that email already exists.';
            return response.redirect('/admin/accounts/create');
        }

        const employeeParts = parseEmployeeNameParts(
            formData.names,
            formData.lastnames
        );

        const [existingFullNameRows] =
            await Employee.findByFullname(employeeParts.fullName);
        if (existingFullNameRows.length > 0) {
            request.session.error =
                'An account with that full name already exists.';
            return response.redirect('/admin/accounts/create');
        }

        if (formData.slackUsername) {
            const [existingSlackRows] =
                await Account.findBySlackUsername(
                    formData.slackUsername
                );

            if (existingSlackRows.length > 0) {
                request.session.error =
                    'An account with that Slack username already exists.';
                return response.redirect('/admin/accounts/create');
            }
        }

        // Creation of objects: Employee -> Account

        const employee = new Employee(
            employeeParts.fullName,
            employeeParts.names,
            employeeParts.lastnames
        );
        await employee.save();

        const [employeeRows] =
            await Employee.getEmployeeIdByFullname(
                employeeParts.fullName
            );

        const employeeId = employeeRows[0]?.employee_id;

        if (!employeeId) {
            throw new Error('Employee ID not found after creation.');
        }

        const account = new Account(
            employeeId,
            formData.email,
            formData.password,
            formData.slackUsername,
            formData.image
        );
        
        await account.save();

        const [accountRows] =
            await Account.getAccountIdByEmailSlack(
                formData.email,
                formData.slackUsername
            );

        const accountId = accountRows[0]?.account_id;

        if (!accountId) {
            throw new Error('Account ID not found after creation.');
        }

        await new AccountRole(accountId, formData.roleId).save();

        // Email validation and change password email sent

        const resetUrl = `${getBaseUrl(request)}/reset`;

        let emailFailed = false;

        try {
            await resendService.sendAccountCreatedEmail(
                formData.email,
                employeeParts.fullName,
                resetUrl
            );
        } catch (err) {
            console.log('Email failed:', err.message);
            emailFailed = true;
        }

        // Management of the account creation response.

        delete request.session.createAccountFormData;

        request.session.success = emailFailed
            ? 'Account created successfully, but email could not be sent.'
            : 'Account created successfully and notification email sent.';

        return response.redirect('/admin/accounts');
    } catch (error) {
        console.log(error);
        request.session.error =
            'Could not create the account right now. Please try again later.';
        return response.redirect('/admin/accounts/create');
    }
};

/*deleteAccount
Function responsible for the deletion of an account*/

exports.deleteAccount = (request, response, next) => {
    request.session.error =
        'Account deletion backend is not implemented yet.';
    return response.redirect('/admin/accounts');
};
