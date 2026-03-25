/*
Title: admin.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
*/

const Role = require('../../models/role');
const RolePrivilege = require('../../models/rolePrivilegeAssignment');
const Privilege = require('../../models/privilege');
const AccountRole = require('../../models/accountRoleAssignment')


exports.getAccounts = (request, response, next) => {
    return response.render('pages/admin-accounts',{
        csrfToken: request.csrfToken(),
    });
};

/*getRoleAdmin
Function responsible for the page render of the Role Administration page*/

exports.getRoleAdmin = (request, response, next) => {
    Role.fetchAll().then(([roles,fieldData])=>{
        RolePrivilege.fetchAll().then(([role_privileges, fieldData])=>{
            Privilege.fetchAll().then(([privileges, fieldData])=>{
                return response.render('pages/admin-roles',{
                    csrfToken: request.csrfToken(),
                    roles: roles, 
                    role_privileges:role_privileges,
                    privileges:privileges,
                    success: request.session.success||'',
                });
            })
            .catch((error)=>{
                console.log(error);
                return response.redirect('/admin/roles');
            })
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/admin/roles');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/admin/roles');
    })
};

/*deleteRole
Function responsible for a role deletion including:
AccountRole tuples update, RolePrivilege tuples deletion and Role deletion*/

exports.deleteRole = (request, response, next) =>{
    AccountRole.updateByRole(request.params.roleId).then(()=>{
        RolePrivilege.deleteByRoleId(request.params.roleId).then(()=>{
            Role.deleteByRoleId(request.params.roleId).then(()=>{
                request.session.success = `The Role with ID ${request.params.roleId} was succesfully deleted`;
                return response.redirect('/admin/roles');
            })
            .catch((error)=>{
                console.log(error);
                return response.redirect('/admin/roles');
            })
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/admin/roles');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/admin/roles');
    })
};