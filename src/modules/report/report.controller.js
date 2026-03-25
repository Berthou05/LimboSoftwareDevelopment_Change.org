/*
Title: report.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Employee = require('../../models/employee');
const Project = require ('../../models/project');
const Team = require('../../models/team');
const Activity = require('../../models/activity');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');
const Report = require('../../models/report');
const { end } = require('../../utils/database');

/*getReport
Function responsible for returning a concrete report page*/

//! This function is under development as it is only used
//! for view design and testing purposes.

exports.getReport = (request, response, next) => {
    return response.render('pages/report',{
        csrfToken: request.csrfToken(),
    });
};

/*generateReport
Function responsible for generating a report based on obtained
filters and content in the body.
Information obtained through body:
- type: {EMPLOYEE, TEAM, PROJECT}
- id: respective_id
- start_date: start_date
- end_date: end_date
- route: route where the report generator was invoked
*/

exports.generateReport = (request, response, next)=>{
    //For testing purposes
    console.log(request.body);
    const {type = '', id='', start_date='', end_date='', route='/home'} = request.body;
    const body={};
    switch (type){
        case 'EMPLOYEE':
            Employee.fetchById(id).then(([info, fieldData])=>{
                body.info = info;
                
                Activity.fetchByEmployeeBtw(id,start_date,end_date).then(([employee_activities, fieldData])=>{
                    body.employee_activities = employee_activities;
                    
                    Team.getEmployeeTeamsInfoBtw(id,start_date,end_date).then(([teams_info, fieldData])=>{
                        body.teams_info = teams_info;
                        
                        Activity.getTeamActivitiesFromEmpBtw(id, start_date, end_date).then(([team_activities, fieldData])=>{
                            body.team_activities = team_activities;

                            Project.getEmployeeProjectsInfoBtw(id,start_date, end_date).then(([employee_projects, fieldData])=>{
                                body.employee_projects = employee_projects;

                                Activity.getProjectActivitiesFromEmpBtw(id,start_date,end_date).then(([project_activities, fieldData])=>{
                                    body.project_activities = project_activities;

                                    //* To be developed.
                                    
                                })
                                .catch((error)=>{
                                    console.log(error);
                                    request.session.error = `Report of Employee:${id} could not be generated\nEmployee Project Activities not obtained.`;
                                    return response.redirect(`${route}`);
                                })
        
                            })
                            .catch((error)=>{
                                console.log(error);
                                request.session.error = `Report of Employee:${id} could not be generated\nEmployee Projects not obtained.`;
                                return response.redirect(`${route}`);
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            request.session.error = `Report of Employee:${id} could not be generated\nEmployee Teams Activities not obtained.`;
                            return response.redirect(`${route}`);
                        })
                    })
                    .catch((error)=>{
                        console.log(error);
                        request.session.error = `Report of Employee:${id} could not be generated\nEmployee Teams not obtained.`;
                        return response.redirect(`${route}`);
                    })
                })
                .catch((error)=>{
                    console.log(error);
                    request.session.error = `Report of Employee:${id} could not be generated\nEmployee Activities not obtained.`;
                    return response.redirect(`${route}`);
                })
            })
            .catch((error)=>{
                console.log(error);
                request.session.error = `Report of Employee:${id} could not be generated\nEmployee Information not obtained.`;
                return response.redirect(`${route}`);
            })
            break;

        case 'TEAM':
            break;

        case 'PROJECT':
            break;

        default:
            request.session.error = `Report of ${type}:${id} could not be generated`;
            return response.redirect(`${route}`);
            break;
    }

    //Here continues the report generation.
    //Follows the prompt obtention.

    //API call

    //Obtention and storage

    //Returning the text output.

};