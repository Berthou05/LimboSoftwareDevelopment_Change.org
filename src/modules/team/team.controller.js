/*
Title: team.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Team = require('../../models/team');
const Employee = require('../../models/employee');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');


const normalizeTeam = function normalizeTeam(team) {
    return {
        id: team.team_id ?? null,
        name: team.name ?? 'Unnamed team',
        leadName:
            team.full_name ??
            'Pending assignment',
        description: team.description ?? 'No team description has been added yet.',
        image: team.image ?? null,
        isMember: Boolean(team.isMember ?? team.is_member),
    };
}


/*getTeams
Function responsible for the obtention of the Teams in the Intermediate
Teams page.
This is only the initial render, returning no search results.
*/

exports.getTeams = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    Team.fetchByEmployeeId(employeeId).then(([teams, fieldData])=>{
        Team.fetchNotByEmployeeId(employeeId).then(([notTeams, fieldData])=>{
            return response.render('pages/teamDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: 'Team',
                pageSubtitle: 'Intermediate selection for own and other teams.',
                myTeams:teams,
                otherTeams:notTeams,
                query:'',
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


/*getTeamPage
Function responsible for handling the indivual Page render:
team_info: team_info: Toda la informacion de Team que viene de la tabla Team
members: Todos los empleados dentro de su relacion con EmployeeTeam

csrfToken: request.csrfToken(),
isLoggedIn: request.session.isLoggedIn || '',
username: request.session.username || '',
pageTitle: `Team ${team_info[0].name}`,
pageSubtitle: '',
info: team_info,
members:team_members,
activities: members_activies,
projects: projects,

*/
exports.getTeamPage = (request, response, next) => {
    const teamId = request.params.team_id;
    const projects = [];
    Team.findById(teamId).then(([team_info,fieldData])=>{
        Employee.getEmployeeByTeamId(teamId).then(([team_members, fieldData])=>{
            Activity.getTeamMembersActivities(teamId).then(([members_activies,fieldData])=>{
                Project.getProjectsByTeamId(teamId).then(([team_projects,fieldData])=>{
                    let sequence = Promise.resolve();
                    team_projects.forEach(proj => {
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
                            pageTitle: `Team ${team_info[0].name}`,
                            pageSubtitle: '',
                            info: team_info,
                            members:team_members,
                            activities: members_activies,
                            projects: projects,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        request.session.error = `Error loading team ${teamId}`;
                        return response.redirect('/team');
                    });

                })
                .catch((error)=>{
                    console.log(error);
                    request.session.error=`Error loading team ${teamId}. Team projects not found.`;
                    return response.redirect('/team');
                })

            })
            .catch((error)=>{
                console.log(error);
                request.session.error=`Error loading team ${teamId}. Team members activies not found.`;
                return response.redirect('/team');
            })

        })
        .catch((error)=>{
            console.log(error);
            request.session.error=`Error loading team ${teamId}. Team members not found.`;
            return response.redirect('/team');
        })
    })
    .catch((error)=>{
        console.log(error);
        request.session.error=`Error loading team ${teamId}. Team Information not found.`;
        return response.redirect('/team');
    });
};

//! Provisional function to load Team Intermediate

exports.searchTeams = (request, response, next) => {
    return response.json({
                        query: '',
                        resultsHtml: '',
                        suggestions: '',
                        totalTeams: '',
                    });
};
