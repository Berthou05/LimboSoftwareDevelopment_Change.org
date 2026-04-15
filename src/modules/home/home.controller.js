const Project = require('../../models/project');
const Report = require('../../models/report');
const Employee = require('../../models/employee');
const Account = require('../../models/account');
const Team = require('../../models/team');

exports.getHome = async (request, response, next) => {
    const sessionUser = request.session.user || {};
    const userId = sessionUser.id;
    const employeeId = sessionUser.employeeId;

    try {
        const [userProjects] = await Project.fetchByEmployeeId(userId);
        const [otherProjects] = await Project.fetchNotByEmployeeId(userId);
        const allVisibleProjects = [...userProjects, ...otherProjects];

        const [accountRows] = userId ? await Account.fetchById(userId) : [[]];
        const [employeeRows] = employeeId ? await Employee.getNamesByEmployeeId(employeeId) : [[]];

        const accountInfo = accountRows[0] || {};
        const employeeInfo = employeeRows[0] || {};

        const displayName = employeeInfo.names || sessionUser.username || 'Usuario';

        return response.render('pages/home', {
            csrfToken: request.csrfToken(),
            pageTitle: 'Home',
            path: '/home',
            user: sessionUser,
            reportSubjects: {
                employees: [],
                teams: [],
                projects: allVisibleProjects
            },
            myProjects: userProjects,
            latestReports: {},
            account: {
                image: accountInfo.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=fbfbfe&color=1f2937`,
            },
            employee: {
                names: displayName,
            },
        });
    } catch (error) {
        console.log('Error en Home Controller:', error);
        next(error);
    }
};