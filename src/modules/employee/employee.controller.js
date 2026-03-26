/*
Title: employee.controller.js
Last modification: March 26,2026
Modified by: Hurtado, R.
*/

const EmployeeTeam = require('../../models/employeeTeamMembership');
const Team = require('../../models/team');
const Employee = require('../../models/employee');
const Activity = require('../../models/activity');
const Project = require('../../models/project');
const Achievement = require('../../models/achievement');
const Goal = require('../../models/goal');

//--------------------------- Auxiliar Functions ---------------------------

/*buildAvatarUrl(fullName)
Auxiliar function responsible for creating a random avatar based on an employee fullName*/

const buildAvatarUrl = function buildAvatarUrl(fullName) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=fbfbfe&color=1f2937`;
};

/*formatDayLabel(value)
Auxiliar function responsible for returning a format in MM/DD/YYYY format divided into
month, day, year*/

const formatDayLabel = function formatDayLabel(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Unknown date';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/*buildActivitySections(activities)
Auxiliar function responsible for creating the format of activities
required for the activity visualization modal.*/

const buildActivitySections = function buildActivitySections(activities) {
    const grouped = new Map();

    activities.forEach((activity) => {
        const rawDate = activity.completed_at;
        const key = rawDate ? new Date(rawDate).toISOString().slice(0, 10) : 'unknown';
        const items = grouped.get(key) || [];
        const authorName = activity.full_name || 'Unknown';

        items.push({
            title: activity.title || 'Untitled activity',
            description: activity.description || '',
            authorName,
            authorInitials: authorName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
            activityTimeLabel: rawDate
                ? new Date(rawDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                })
                : '',
        });

        grouped.set(key, items);
    });

    return [...grouped.entries()]
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .map(([key, items]) => ({
            dayLabel: key === 'unknown' ? 'Unknown date' : formatDayLabel(key),
            items,
        }));
};

//--------------------------- Main Functions ---------------------------

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
    const privileges = request.session.privileges;

    const intermediate = privileges.some(
        priv => priv.privilege_id === 'TEAM-01'
    );

    if (!intermediate) {
        return response.redirect(`/employee/${employeeId}`);
    }

    Employee.getNearEmployees(employeeId).then(([near_employees]) => {

        const employees = near_employees.map((employee) => ({
            employee_id:employee.employee_id,
            full_name: employee.full_name,
            slack_username: employee.slack_username,
            email:employee.email,
            image: buildAvatarUrl(employee.full_name),
        }));

        return response.render('pages/employeeDirectory', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: `Employee`,
            pageSubtitle: 'Intermediate selection for self and other employees.',
            employees: employees,
            query: '',
        });
    })
    .catch((error) => {
        console.log(error);
        request.session.error = `Error loading Intermediate`;
        return response.redirect('/home');
    });
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
    EmployeeTeam.fetchTeamInfoByEmployee(employeeId).then(([team, fieldData])=>{
        Employee.fetchById(employeeId).then(([info,fieldData])=>{
            Activity.fetchByEmployee(employeeId).then(([activities,fieldData])=>{
                Project.getProjectByEmployeeId(employeeId).then(([employee_projects, fieldData])=>{

                    const projectRows = employee_projects.map(proj => ({
                        project: {
                            id: proj.project_id,
                            name: proj.name // make sure your query returns this
                        },
                        roleName: proj.coll_description || 'MEMBER', // adjust to your column
                        startDateLabel: formatDayLabel(proj.started_at) // or correct field
                    }));

                    const teamRows = team.map((team) => ({
                        team: {
                            id: team.team_id,
                            name: team.name,
                        },
                        roleName: team.role || 'EMPLOYEE',
                        startDateLabel: formatDayLabel(team.joined_at),
                    }));

                    const employee = {
                        employee_id: info[0].employee_id,
                        full_name: info[0].full_name,
                        image: buildAvatarUrl(info[0].full_name),
                    };

                    //Analizar como se declara projectRows. Su estructura

                    const reportSubjects = {
                        employees: [
                            { id: employeeId, name: employee.full_name},
                        ],
                        teams: [],
                        projects: []
                    };

                    
                    return response.render('pages/employeeDetails', {
                        csrfToken: request.csrfToken(),
                        isLoggedIn: request.session.isLoggedIn || '',
                        username: request.session.username || '',
                        pageTitle: `Employee ${info[0].full_name}`,
                        pageSubtitle: '',
                        employee:employee,
                        isOwnProfile: request.session.employeeId === info.employee_id,
                        activitySections: buildActivitySections(activities),
                        teamRows:teamRows,
                        projectRows:projectRows,
                        defaultReportType:'EMPLOYEE',
                        defaultSubjectId:employeeId,
                        reportSubjects:reportSubjects,
                        latestReports:'',
                        quickReport:'',
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


