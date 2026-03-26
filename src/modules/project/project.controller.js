/*
Title: project.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
*/

const Project = require('../../models/project');
const Goal = require('../../models/goal');

const PAGE_TITLE = 'Project';
const PAGE_SUBTITLE = 'Intermediate selection for own and other projects.';

const normalizeProject = function normalizeProject(project) {
    return {
        id: project.project_id ?? null,
        name: project.name ?? 'Unnamed project',
        leadName: project.full_name || project.lead_name || 'Pending assignment',
        description: project.description ?? 'No project description has been added yet.',
        image: project.image ?? null,
        isMember: Boolean(project.isMember ?? project.is_member),
        status: project.status ?? '',
        startDate: project.start_date ?? '',
        endDate: project.end_date ?? '',
    };
};

exports.getProjects = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    Project.fetchByEmployeeId(employeeId).then(([projects, fieldData])=>{
        Project.fetchNotByEmployeeId(employeeId).then(([notProjects, fieldData])=>{
            return response.render('pages/projectDirectory', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: PAGE_TITLE,
                pageSubtitle: PAGE_SUBTITLE,
                myProjects: projects.map((project) => normalizeProject(project)),
                otherProjects: notProjects.map((project) => normalizeProject(project)),
                query: '',
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
    });
};

exports.getProjectPage = (request, response, next) => {
    const projectId = request.params.project_id;
    Project.findById(projectId)
        .then(([projectRows]) => {
            if (!projectRows || projectRows.length === 0) {
                return response.status(404).render('pages/project', {
                    error: 'Project not found',
                    project: null,
                    projectName: 'Project not found',
                    projectDescription: 'No project information is available for the selected project.',
                    csrfToken: request.csrfToken(),
                    isLoggedIn: request.session.isLoggedIn || '',
                    username: request.session.username || '',
                });
            }

            const project = projectRows[0];

            return response.render('pages/project', {
                project,
                error: '',
                projectName: project.name ?? 'Project',
                projectDescription:
                    project.description ?? 'No project description has been added yet.',
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

exports.searchProjects = (request, response, next) => {
    return response.json({
                        query: '',
                        resultsHtml: '',
                        suggestions: '',
                        totalTeams: '',
                    });
};

// (Removed unused getProject function)

/*deleteGoal
AJAX function responsible for handling the goal deletion.*/

exports.deleteGoal = (request, response, next)=>{
    Goal.delete(request.params.goal_id).then(()=>{
        return response.status(200).json({success:true});
    })
    .catch((error)=>{
        console.log(error);
        return response.status(500).json({success:false, message: error.stack});
    })
};
