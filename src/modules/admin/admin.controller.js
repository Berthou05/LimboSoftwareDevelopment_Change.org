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
Function responsible for the page render of the Account Administration page

totalAccounts()

account[
    {
        id:
        employee{
            fullName:
        }
        email:
        slackUsername:
        status:
        createdAt:
    }
]

roles[
    {
        id:
        name:
    }
]


*/

exports.getAccounts = (request, response, next) => {
    Promise.all([
        
        Role.fetchAll()
    ])


    return response.render('pages/admin-accounts',{
        csrfToken: request.csrfToken(),
        pageTitle: 'Accounts Administration',
        pageSubtitle: 'Page responsible for the visualization, edition and deletion of accounts of the Unitas System',
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
