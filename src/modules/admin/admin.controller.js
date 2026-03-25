/*
Title: admin.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Role = require('../../models/role');
const RolePrivilege = require('../../models/rolePrivilegeAssignment');
const Privilege = require('../../models/privilege');

exports.getAccounts = (request, response, next) => {
    response.render('pages/admin-accounts',{
        csrfToken: request.csrfToken(),
    });
};

exports.getRoleAdmin = (request, response, next) => {
    Role.getRoles().then(([roles,fieldData])=>{

    })
    .catch((error)=>{
        console.log(error);
        response.redirect('/admin/roles');
    })


    response.render('pages/admin-roles',{
        csrfToken: request.csrfToken(),
    });
};
