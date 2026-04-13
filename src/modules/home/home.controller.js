const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee'); 
const Team = require('../../models/team');

exports.getHome = async (request, response, next) => {
    const userId = request.session.user.id;

    try {
        const [userProjects] = await Project.fetchByEmployeeId(userId);
        const [otherProjects] = await Project.fetchNotByEmployeeId(userId);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        return response.render('pages/home', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Home',
            path: '/home',
            user: request.session.user,
            reportSubjects: {
                employees: [],
                teams: [],
                projects: allVisibleProjects
            },
            myProjects: userProjects,

            // Exponer explícitamente para el view
            account: request.session.user,   // para account.image
            employee: request.session.user,  // para employee.names
        });
    } catch (error) {
        console.log("Error en Home Controller:", error);
        next(error);
    }
};