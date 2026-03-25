/*
Title: employee.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');

/*getEmployee()
Function responsible accesing the intermediate employee page
only available for Lead and Admin.*/

//! This function is under developmemt as it is currently used
//! for view testing.
//! Correct later for intermediate page.

exports.getEmployee = (request, response, next) => {
    return response.render('pages/employee',{
        csrfToken: request.csrfToken(),
    });
};

/*getEmployeePage
Function responsible for rendering a concrete employee page*/

exports.getEmployeePage= (request, response, next)=>{
    
    // TODO: It is necessary to integrate the additional
    // TODO - models and data obtention in order to perform
    // TODO - the complete render.

    EmployeeTeam.fetchTeamInfoByEmployee(request.params.employee_id).then(([teams, fieldData])=>{
        return response.render('pages/employee',{
            csrfToken: request.csrfToken(),
            teams:teams,
            //! Additional information is missing here.
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect(`/employee`);
    })
}

