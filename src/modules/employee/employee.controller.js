/*
Title: employee.controller.js
Last modification: March 26,2026
Modified by: Alexis Berthou
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');
const Employee = require('../../models/employee');

/*buildAvatarUrl(fullName)
Function responsible for returning a default avatar URL for the employee.*/

const buildAvatarUrl = function buildAvatarUrl(fullName) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=fbfbfe&color=1f2937`;
};

/*formatDateLabel(value)
Function responsible for returning a valid start date label.*/

const formatDateLabel = function formatDateLabel(value) {
    if (!value) {
        return 'Start date unavailable';
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Start date unavailable';
    }

    return parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/*getEmployee()
Function responsible accesing the intermediate employee page
only available for Lead and Admin.*/
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
    const query = `${request.query.q || ''}`.trim().toLowerCase();

    Employee.fetchAll().then(([employees, fieldData]) => {
        const employeeCards = employees
            .map((employee) => {
                const fullName = employee.full_name || 'Employee';

                return {
                    id: employee.employee_id,
                    fullName,
                    title: 'Employee',
                    bio: 'Profile details are still being connected.',
                    avatar: buildAvatarUrl(fullName),
                };
            })
            .filter((employee) => {
                if (!query) {
                    return true;
                }

                return employee.fullName.toLowerCase().includes(query);
            });

        return response.render('pages/employee', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: 'Employee',
            pageSubtitle: 'Intermediate selection for employees.',
            employees: employeeCards,
            query: request.query.q || '',
        });
    })
    .catch((error) => {
        console.log(error);
        request.session.error = 'Error loading employee directory.';
        return response.redirect('/home');
    });
    const employeeId = request.session.employeeId;
    const privileges = request.session.privileges;
    for(let priv in privileges){
        if(priv == 'TEAM-01'){
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
        }
    }
    return response.redirect(`/employee/${employeeId}`);

    
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

exports.getEmployeePage = (request, response, next) => {
    const employeeId = request.params.employee_id;

    EmployeeTeam.fetchTeamInfoByEmployee(employeeId).then(([teams, fieldData]) => {
        Employee.fetchById(employeeId).then(([info, fieldData]) => {
            if (!info.length) {
                request.session.error = `Error loading Employee ${employeeId}. Employee Information not found.`;
                return response.redirect('/employees');
            }

            const employeeInfo = info[0];
            const employeeName = employeeInfo.full_name || 'Employee';
            const employee = {
                id: employeeInfo.employee_id,
                fullName: employeeName,
                title: 'Employee',
                timezone: 'UTC-06:00',
                bio: 'Detailed employee data is still under construction.',
                avatar: buildAvatarUrl(employeeName),
            };

            const teamRows = teams.map((team) => ({
                team: {
                    id: team.team_id,
                    name: team.name,
                },
                roleName: team.role || 'EMPLOYEE',
                startDateLabel: formatDateLabel(team.joined_at),
            }));

            return response.render('pages/employeeDetails', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: `Employee ${employeeName}`,
                pageSubtitle: '',
                info,
                teams,
                activities: [],
                projects: [],
                employee,
                isOwnProfile: request.session.employeeId === employeeInfo.employee_id,
                activitySections: [],
                defaultReportType: 'EMPLOYEE',
                defaultSubjectId: employeeInfo.employee_id,
                reportSubjects: {
                    employees: [{
                        id: employeeInfo.employee_id,
                        label: employeeName,
                    }],
                    teams: [],
                    projects: [],
                },
                latestReports: {},
                quickReport: undefined,
                teamRows,
                projectRows: [],
            });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = `Error loading Employee ${employeeId}. Employee Information not found.`;
            return response.redirect('/employees');
        });
    })
    .catch((error) => {
        console.log(error);
        request.session.error = `Error loading Employee ${employeeId}. Employee Teams not found.`;
        return response.redirect('/employees');
    });
};
