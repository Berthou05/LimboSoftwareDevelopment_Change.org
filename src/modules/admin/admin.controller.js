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
const req = require('express/lib/request');

//------------ Auxiliar Functions -----------------

/*formatDateLabel
Function responsible for giving a concrete format to the given data
for normalization purposes*/

const formatDateLabel = function formatDateLabel(value, fallback = '') {
    if (!value) {
        return fallback;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

//------------------- Main Functions --------------------

/*getAccounts
Function responsible for the page render of the Account Administration page*/

exports.getAccounts = (request, response, next) => {
    const roleFilter   = request.query.role   || 'all';
    const statusFilter = request.query.status || 'all';

    Promise.all([
        Account.fetchAll(roleFilter,statusFilter),
        Account.countAll(),
        Role.fetchAll()
    ]).then(([
        [accounts],
        [totalAccounts],
        [roles]
    ])=>{

        return response.render('pages/admin-accounts',{
            csrfToken: request.csrfToken(),
            pageTitle: 'Accounts Administration',
            pageSubtitle: 'Page responsible for the visualization, edition and deletion of accounts of the Unitas System',
            totalAccounts: totalAccounts[0].count,
            accounts: accounts.map((account)=>({
                id: account.account_id,
                employee:{
                    fullName:account.full_name 
                },
                email:account.email,
                slackUsername: account.slack_username,
                status: account.status,
                createdAt:formatDateLabel(account.created_at),
                roleId:account.role_id
            })),
            roles: roles.map((role)=>({
                id: role.role_id,
                name: role.name
            })),
            statusFilter:'all',
            roleFilter:'all'
        });

    }).catch((error) => {
        console.log(error);
        request.flash('error',error);
        return response.redirect('/home');
    });
};




/*assignRole
Function responsible for assigning a role to an account*/

exports.assignRole = (request,response,next)=>{
    const accountId = request.params.account_id;
    const roleId = request.body.roleId;
    AccountRole.countActiveAdminsExcluding(accountId).then(([count,fieldData])=>{
        if(count[0].admin_count > 0){
            AccountRole.updateRole(accountId, roleId).then(()=>{
                AccountRole.fetchRoleByAccount(accountId).then(([accountRoleRow, fieldData])=>{
                    return response.status(200).json({ success: true, message: 'Role updated successfully.', data:{ account_id: accountRoleRow[0].account_id, role_name: accountRoleRow[0].name}});
                })
                .catch((error)=>{
                    console.log(error);
                    return response.status(500).json({ error: 'Account information could not be updated.' })
                })
            })  
            .catch((error)=>{
                console.log(error);
                return response.status(500).json({ error: 'Role could not be updated right now.' })
            })
        }
        else{
            console.log(error);
            return response.status(409).json({ error: 'At least one Admin account is required.' })
        }
    })
    .catch((error)=>{
        console.log(error);
        request.flash('error',error);
        return response.redirect('/admin/accounts');
    })
}


/*assignStatus
Function responsible for assigning a role to an account*/

exports.assignStatus = (request,response,next)=>{
    const accountId = request.params.account_id;
    const status = request.body.status;
    AccountRole.countActiveAdminsExcluding(accountId).then(([count,fieldData])=>{
        if(count[0].admin_count > 0){
            Account.updateStatus(status,accountId).then(()=>{
                Account.fetchById(accountId).then(([accountInfo, fieldData])=>{
                    return response.status(200).json({ success: true, message: 'Status updated successfully.', data:{ account_id: accountInfo[0].account_id, status: accountInfo[0].status}});
                })
                .catch((error)=>{
                    console.log(error);
                    return response.status(500).json({ error: 'Account information could not be updated.' })
                })
            }).catch((error)=>{
                console.log(error);
                return response.status(409).json({ error: 'Status couldn\'t be updated.'});
            })
        }
        else{
            console.log(error);
            return response.status(409).json({ error: 'At least one Admin account is required.' });
        }
    })
    .catch((error)=>{
        console.log(error);
        return response.status(409).json({ error: 'Admin count could\'t be validated'});
    })
}


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

                rolesMap[row.role_id].privilegeCodes.push(row.privilege_id);
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

/*AssignPrivilege
Function responsible for returning a status response that changes or maintains the intentioned toggle*/
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
                            message: `The Role with ID ${request.params.roleId} was succesfully deleted`
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
    const role = new Role(request.params.name);
    role.save().then(()=>{
        request.session.success = `The Role  ${request.params.roleId} was created successfully`;
        return response.redirect('/admin/roles');
    })
    .catch((error)=>{
        console.log(error);
        request.session.error = `The Role ${request.params.name} could not be created`;
        return response.redirect('admin/roles');
    })
};

/*getCreateAccount
Function responsible for rendering the create account page from admin accounts.*/

exports.getCreateAccount = (request, response, next) => {
    Role.fetchAll().then(([roles]) => {
        return response.render('pages/admin-createAccount', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Create Account',
            pageSubtitle: 'Page responsible for the creation of accounts in the Unitas System',
            roles: roles.map((role) => ({
                id: role.role_id,
                name: role.name
            })),
            formData: {
                fullName: '',
                email: '',
                slackUsername: '',
                roleId: '',
                image: ''
            }
        });
    }).catch((error) => {
        console.log(error);
        request.session.error = 'We could not load the create account view right now.';
        return response.redirect('/admin/accounts');
    });
};

/*postCreateAccount
Temporary placeholder while account creation backend is pending implementation.*/

exports.postCreateAccount = (request, response, next) => {
    request.session.error = 'Account creation backend is not implemented yet.';
    return response.redirect('/admin/accounts/create');
};

/*deleteAccount
Temporary placeholder while account deletion backend is pending implementation.*/

exports.deleteAccount = (request, response, next) => {
    request.session.error = 'Account deletion backend is not implemented yet.';
    return response.redirect('/admin/accounts');
};
