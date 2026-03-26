/*
Title: employee.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');
const Team = require('../../models/team');
const Employee = require('../../models/employee');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');

/*getEmployee()
Function responsible accesing the intermediate employee page
only available for Lead and Admin.
Rendering the following information:

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Employee`,
pageSubtitle: 'Intermediate selection for self and other employees.',
me:me,
employees:near_employees,
*/

exports.getEmployee = (request, response, next) => {
    const employeeId = request.session.employeeId;
    Employee.fetchById(employeeId).then(([me,fieldData])=>{
        Employee.getNearEmployees(employeeId).then(([near_employees,fieldData])=>{
            return response.render('pages/employeeDirectory',{
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: `Employee`,
                pageSubtitle: 'Intermediate selection for self and other employees.',
                me:me,
                employees:near_employees,
            })
        })
        .catch((error)=>{
            console.log(error);
            request.session.error = `Error loading Intermediate. Near Employees Not Found`;
            return response.redirect('/home');
        })
    })
    .catch((error)=>{
        console.log(error);
        request.session.error = `Error loading Intermediate. Your Employee Not Found`;
        return response.redirect('/home');
    })
};

/*getEmployeePage
Function responsible for rendering a concrete employee page
Render of:

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Employee ${info[0].full_name}`,
pageSubtitle: '',
info:info,
activities:activities,
teams:teams,
projects:projects,*/

exports.getEmployeePage = (request, response, next)=>{
    const employeeId = request.params.employee_id;
    const projects = [];
    EmployeeTeam.fetchTeamInfoByEmployee(employeeId).then(([teams, fieldData])=>{
        Employee.fetchById(employeeId).then(([info,fieldData])=>{
            Activity.fetchByEmployee(employeeId).then(([activities,fieldData])=>{
                Project.getProjectByEmployeeId(employeeId).then(([employee_projects, fieldData])=>{

                    let sequence = Promise.resolve();
                    employee_projects.forEach(proj => {
                        sequence = sequence.then(() => {
                            const project = {
                                info: proj,
                                goals: [],
                                achievements: []
                            };

                            return Achievement.fetchByProject(proj.project_id).then(([achievements,fieldData]) => {
                                    project.achievements = achievements;
                                    return Goal.fetchByProject(proj.project_id);
                            })
                            .then(([goals,fieldData]) => {
                                project.goals = goals;
                                projects.push(project);
                            })
                            .catch(error => {
                                console.log(error);
                                throw error;
                            });
                        });
                    });

                    sequence.then(() => {
                        return response.render('pages/team', {
                            csrfToken: request.csrfToken(),
                            isLoggedIn: request.session.isLoggedIn || '',
                            username: request.session.username || '',
                            pageTitle: `Employee ${info[0].full_name}`,
                            pageSubtitle: '',
                            info:info,
                            activities:activities,
                            teams:teams,
                            projects:projects,
                            
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        request.session.error = `Error loading employee ${employeeId}`;
                        return response.redirect('/employee');
                    });

                })
                .catch((error)=>{
                    console.log(error);
                    request.session.error = `Error loading Employee ${employeeId}. Employee Projects not found.`;
                    return response.redirect(`/employee`);
                })
            })
            .catch((error)=>{
                console.log(error);
                request.session.error = `Error loading Employee ${employeeId}. Employee Activies not found.`;
                return response.redirect(`/employee`);
            })
        })
        .catch((error)=>{
            console.log(error);
            request.session.error = `Error loading Employee ${employeeId}. Employee Information not found.`;
            return response.redirect(`/employee`);
        })
    })
    .catch((error)=>{
        console.log(error);
        request.session.error = `Error loading Employee ${employeeId}. Employee Teams not found.`;
        return response.redirect(`/employee`);
    })
}

