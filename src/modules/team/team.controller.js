/*
Title: team.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Team = require('../../models/team');

exports.getTeams = (request, response, next) => {
    Team.findAll()
        .then(([teams, fieldData]) => {
            return response.render('pages/team', {
                teams: teams,
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
            });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
};

exports.getTeamDetails = (request, response, next) => {
    const teamId = request.params.team_id;
    Team.findById(teamId)
        .then(([teamRows, fieldData]) => {
            if (!teamRows || teamRows.length === 0) {
                return response.status(404).render('pages/team', {
                    error: 'Team not found',
                    csrfToken: request.csrfToken(),
                    isLoggedIn: request.session.isLoggedIn || '',
                    username: request.session.username || '',
                });
            }
            // Aquí podrías buscar los proyectos asociados si tienes el modelo Project
            return response.render('pages/team', {
                team: teamRows[0],
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
            });
        })
        .catch((error) => {
            console.log(error);
            next(error);
        });
};
