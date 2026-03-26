/*
Title: home.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');
const Employee = require('../../models/employee');
const Team = require('../../models/team');
const Project = require('../../models/project');
const Activity = require('../../models/activity');

/* getHome()
Function responsible for rendering the home page with the latest activity sections.
*/

exports.getHome = (request, response, next) => {
    const employeeId = request.session.employeeId;
    
    Employee.fetchById(employeeId).then(([employee]) => {
            


        return response.render('pages/home',{
            csrfToken: request.csrfToken(),
        });
};
