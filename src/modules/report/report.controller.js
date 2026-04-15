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
const Prompt = require('../../models/prompt');
const Report = require('../../models/report');
const Search = require('../../models/search');
const { end } = require('../../utils/database');

/*getAiWrapper()
Function responsible for loading the AI wrapper ESM module from a
CommonJS controller.*/

const getAiWrapper = async function getAiWrapper() {
    return import('../../utils/webServices/aiWrapper.mjs');
};


const REPORT_FORMATS = {
    EMPLOYEE: {
        title: 'Employee Report Format',
        sections: [
            {
                title: 'What went well?',
                groups: [
                    {
                        title: 'Project: Endorsements',
                        items: [
                            'Implemented several UI improvements based on feedback from internal demos, embracing openness to team input to refine the user experience and address usability issues identified during reviews.',
                            'Fixed bugs affecting task interactions and key user flows, taking responsibility for improving platform stability and ensuring smoother user interactions.',
                            'Addressed pull request feedback and incorporated suggested changes through candid technical discussions that helped move features forward while maintaining code quality standards.',
                            'Completed code reviews for teammates’ pull requests, helping maintain consistency with the project’s architecture and strengthening collaboration across the team.',
                            'Updated preview functionality to improve reliability and better align it with the intended user workflow, contributing to the team’s ambition to continuously improve the product experience.',
                        ],
                    },
                    {
                        title: 'Project: Ready to Share',
                        items: [
                            'Participated in technical discussions and reviews with openness to different perspectives in order to clarify implementation details and refine the feature design.',
                            'Assisted in testing and reviewing updates to help ensure stable integration with existing platform features.',
                            'Improved form validations and error handling to prevent incorrect inputs and provide clearer feedback to users, contributing to a more reliable experience.',
                            'Refined confirmation messages and UI feedback states to make system responses clearer and more intuitive.',
                            'Integrated shared components developed by another squad, helping build stronger cross-team connections while maintaining UI consistency across the platform.',
                            'Contributed to work related to the Signed Petition Home MVP, which is showing promising early results: the view-to-share conversion rate is ~8% compared to ~4% in the control, representing a 100% increase [LINK].',
                            'Helped support improvements tied to sharing flows, where 48% of shares in the Signed Petition Home are coming from header share channels and 51% from the checklist feature, including 36% from “text a friend” / “email a friend” and 15% from social sharing options [LINK].',
                        ],
                    },
                ],
            },
            {
                title: 'What could be improved?',
                items: [
                    'Strengthen coordination when integrating changes across different areas of the system or across teams.',
                    'Continue improving documentation of technical decisions to support knowledge sharing and team alignment.',
                    'Plan cross-feature integrations earlier to reduce last-minute adjustments during development.',
                ],
            },
        ],
    },
    TEAM: {
        title: 'Team Report Format',
        sections: [
            {
                title: 'What went well?',
                groups: [
                    {
                        title: 'Project: Endorsements',
                        subgroups: [
                            {
                                title: 'Camila Cuevas (@ana.cuevas)',
                                items: [
                                    'Implemented several UI improvements based on feedback from internal demos, refining the user experience and addressing usability issues identified during reviews.',
                                    'Addressed pull request feedback and incorporated suggested changes through technical discussions that helped maintain code quality standards [LINK].',
                                ],
                            },
                            {
                                title: 'Alexis Berthou (@alexis.berthou)',
                                items: [
                                    'Contributed to architectural alignment through code reviews and technical discussions, helping maintain consistency across modules.',
                                    'Supported feature development by reviewing and validating implementations against project standards [LINK].',
                                ],
                            },
                            {
                                title: 'Alejandro Contreras (@alejandro.contreras)',
                                items: [
                                    'Collaborated on resolving issues affecting core flows, contributing to improved system stability.',
                                    'Participated in pull request reviews and discussions to ensure quality and alignment with system design [LINK].',
                                ],
                            },
                            {
                                title: 'Rodrigo Hurtado (@rodrigo.hurtado)',
                                items: [
                                    'Strengthened collaboration through consistent participation in code reviews, helping enforce architectural consistency.',
                                    'Supported ongoing improvements by validating feature behavior and identifying edge cases during development.',
                                ],
                            },
                        ],
                    },
                    {
                        title: 'Project: Ready to Share',
                        subgroups: [
                            {
                                title: 'Camila Cuevas (@ana.cuevas)',
                                items: [
                                    'Participated in technical discussions and reviews to clarify implementation details and refine feature design [LINK].',
                                    'Improved form validations and error handling, reducing incorrect inputs and improving user feedback.',
                                ],
                            },
                            {
                                title: 'Alexis Berthou (@alexis.berthou)',
                                items: [
                                    'Collaborated on integrating shared components from another squad, ensuring UI consistency across the platform.',
                                    'Supported cross-team alignment by coordinating integration efforts and validating shared functionality.',
                                ],
                            },
                            {
                                title: 'Alejandro Contreras (@alejandro.contreras)',
                                items: [
                                    'Assisted in testing and reviewing updates to ensure stable integration with existing platform features.',
                                    'Contributed to maintaining system reliability during feature rollouts.',
                                ],
                            },
                            {
                                title: 'Rodrigo Hurtado (@rodrigo.hurtado)',
                                items: [
                                    'Participated in testing and validation of feature updates, helping ensure smooth integration across modules.',
                                    'Supported coordination efforts between different parts of the system during development.',
                                ],
                            },
                        ],
                    },
                    {
                        title: 'Team Impact (Cross-functional contributions)',
                        items: [
                            'Contributed to the Signed Petition Home MVP, achieving a ~8% view-to-share conversion rate vs ~4% in the control, representing a 100% increase [LINK].',
                            'Enabled diversified sharing behavior, where 48% of shares come from header channels and 51% from the checklist feature, including 36% via direct messaging (text/email) and 15% via social sharing options [LINK].',
                        ],
                    },
                ],
            },
            {
                title: 'What could be improved?',
                items: [
                    'Improve coordination across team members when integrating changes in different areas of the system.',
                    'Strengthen documentation of technical decisions to support shared understanding and onboarding.',
                    'Plan cross-feature integrations earlier to reduce last-minute adjustments and improve delivery predictability.',
                ],
            },
        ],
    },
    PROJECT: {
        title: 'Project Report Format',
        sections: [
            {
                title: 'What went well?',
                groups: [
                    {
                        title: 'Camila Cuevas (@ana.cuevas)',
                        items: [
                            'Implemented UI improvements based on feedback from internal demos, refining the user experience and addressing usability issues identified during reviews.',
                            'Fixed bugs affecting key user flows, improving platform stability and ensuring smoother user interactions.',
                            'Improved form validations and error handling, reducing incorrect inputs and enhancing user feedback.',
                            'Refined confirmation messages and UI feedback states, making system responses more intuitive.',
                            'Participated in technical discussions and reviews to clarify implementation details and refine feature design [LINK].',
                        ],
                    },
                    {
                        title: 'Alexis Berthou (@alexis.berthou)',
                        items: [
                            'Contributed to architectural consistency through code reviews and technical discussions, ensuring alignment across different modules.',
                            'Supported integration of shared components, maintaining UI consistency across the platform.',
                            'Collaborated in cross-team efforts to validate implementations and ensure alignment with shared standards [LINK].',
                        ],
                    },
                    {
                        title: 'Alejandro Contreras (@alejandro.contreras)',
                        items: [
                            'Assisted in testing and reviewing updates, ensuring stable integration with existing platform features.',
                            'Contributed to resolving issues affecting core functionality, supporting overall system reliability.',
                            'Participated in pull request reviews and validation processes to maintain quality standards [LINK].',
                        ],
                    },
                    {
                        title: 'Rodrigo Hurtado (@rodrigo.hurtado)',
                        items: [
                            'Strengthened collaboration through consistent participation in code reviews, helping enforce architectural consistency.',
                            'Supported validation of feature behavior and identification of edge cases during development.',
                            'Contributed to coordination efforts across different parts of the system during feature integration.',
                        ],
                    },
                ],
            },
            {
                title: 'What could be improved?',
                items: [
                    'Improve coordination across team members when integrating changes in different areas of the system.',
                    'Strengthen documentation of technical decisions to support shared understanding and alignment.',
                    'Plan cross-feature integrations earlier to reduce last-minute adjustments and improve delivery predictability.',
                ],
            },
        ],
    },
};

//---------------------- Auxiliar functions ---------------------------

function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
    }, {});
}



function groupByTwoLevels(array, key1, key2) {
    return array.reduce((acc, item) => {
        const k1 = item[key1];
        const k2 = item[key2];

        if (!acc[k1]) acc[k1] = {};
        if (!acc[k1][k2]) acc[k1][k2] = [];

        acc[k1][k2].push(item);

        return acc;
    }, {});
}


function groupByThreeLevels(array, key1, key2, key3) {
    return array.reduce((acc, item) => {
        const k1 = item[key1]; // project
        const k2 = item[key2]; // team
        const k3 = item[key3]; // employee

        if (!acc[k1]) acc[k1] = {};
        if (!acc[k1][k2]) acc[k1][k2] = {};
        if (!acc[k1][k2][k3]) acc[k1][k2][k3] = [];

        acc[k1][k2][k3].push(item);

        return acc;
    }, {});
}

function normalizeSection(section) {
    return {
        title: section.title,
        items: section.items ?? [],
        groups: section.groups ?? [],
    };
};

function buildWhatWentWellSection(wentWell){
    const groups = Object.values(wentWell).map(project => {
    return {
        title: project.title,
        items: project.items ?? [],
        subgroups: project.subgroups ?? [],
        };
    });

    return {
        title: "What went well?",
        groups,
    };
};


//---------------------------------------------------------------------


/*normalizeReportRequest(body)
Function responsible for normalizing report generator payloads coming from
legacy and current views.*/

const normalizeReportRequest = function normalizeReportRequest(body = {}) {
    const contentType = typeof body.contentType === 'string'
        ? body.contentType
        : body.type;
    const subjectId = typeof body.subjectId === 'string'
        ? body.subjectId
        : body.id;
    const periodStart = typeof body.periodStart === 'string'
        ? body.periodStart
        : body.start_date;
    const periodEnd = typeof body.periodEnd === 'string'
        ? body.periodEnd
        : body.end_date;
    const redirectTo = typeof body.redirectTo === 'string'
        ? body.redirectTo
        : body.route;

    return {
        type: String(contentType || '').trim().toUpperCase(),
        id: String(subjectId || '').trim(),
        start_date: String(periodStart || '').trim(),
        end_date: String(periodEnd || '').trim(),
        route: String(redirectTo || '/home').trim() || '/home',
    };
};

const normalizeReportType = function normalizeReportType(value = '') {
    const reportType = String(value || '').trim().toUpperCase();

    if (reportType === 'EMPLOYEE' || reportType === 'TEAM' || reportType === 'PROJECT') {
        return reportType;
    }

    return '';
};

/*getReport
Function responsible for returning a concrete report page*/

//! This function is under development as it is only used
//! for view design and testing purposes.

//testing route /reports/view/project/db0b319d-382c-11f1-ba39-4c5f701a0fe0
//testing route /reports/view/project/e1c51f1e-3819-11f1-ba39-4c5f701a0fe0

exports.getReport = (request, response, next) => {
    const reportType = normalizeReportType(request.params.content_type || request.query.type || 'EMPLOYEE') || 'EMPLOYEE';
    const redirectTo = typeof request.query.redirectTo === 'string'
        ? request.query.redirectTo
        : '/home';
    console.log(request.params.id);

    Report.fetchById(request.params.id).then(([report,fieldData])=>{
        console.log(report);
        Search.getNameFromId(report[0].content_id).then(([name, fieldData])=>{

            console.log(name[0]);

            return response.render('pages/report',{
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: name[0].full_name,
                title: name[0].full_name,
                pageSubtitle: '',
                reportType: report[0].content_type,
                reportFormat: JSON.parse(report[0].ai_output_text),
                redirectTo,
            });
        })
        .catch((error)=>{
            console.log(error);
            return responde.redirect(typeof request.query.redirectTo === 'string'
            ? request.query.redirectTo
            : '/home'); 
        })
    })
    .catch((error)=>{
        console.log(error);
        return responde.redirect(typeof request.query.redirectTo === 'string'
        ? request.query.redirectTo
        : '/home');
    })
};


// ------------- Handler functions -------------


/*getEmployeeContext(employee_id, start_date, end_date)
Asyncronous function responsible for obtaining the employee information, 
normalization and project_ids of related projects.*/

async function getEmployeeContext(employee_id, start_date, end_date){
    try {
        const [employee_info] = await Employee.fetchById(employee_id);

        const context = {
            id: employee_info[0].employee_id,
            fullName: employee_info[0].full_name,
        };

        const [project_ids] = await Project.getEmployeeProjectIDsBtw(employee_id,start_date,end_date);

        return {
            context,
            projectIds:project_ids
        };

    } catch (error) {
        throw error;
    }
}

/*getTeamContext(team_id, start_date, end_date)
Ayncronous function responsible for obtaining the team informacion,
normalization and project_ids of projects related to the team.*/

async function getTeamContext(team_id, start_date, end_date){
    try{
        [team_info] = await Team.findById(team_id);

        const context = {
            id:team_info[0].team_id,
            name: team_info[0].name,
            responsible: team_info[0].full_name,
            description: team_info[0].description,
        };

        [project_ids] = await Project.getTeamProjectIDsBtw(team_id, start_date, end_date);

        return {
            context,
            projectIds:project_ids
        }

    }catch(error){
        throw error;
    }
};


/*getProjectContext(project_id, start_date, end_date)
Asyncronous function responsinble for obtaining the project information
and normalization.*/

async function getProjectContext(project_id, start_date, end_date){
    try{
        [project_info] = await Project.findById(project_id);

        const context = {
            id:project_info[0].project_id,
            name: project_info[0].name,
            responsible:project_info[0].lead_name,
            description:project_info[0].description,
        }

        return {
            context,
            projectIds: [project_id]
        }
    }catch(error){
        throw error;
    }
};


/*handlers
Dictionary that stores the multiple variants of getting the context and project
ids*/

const handlers = {
    'EMPLOYEE':getEmployeeContext,
    'TEAM': getTeamContext,
    'PROJECT': getProjectContext
};

/*getContext(reportType, id, start_date, end_date, route)
Asyncronous function responsible foe obtaining context and common project
elements as activities, goals and achievements*/

async function getContext(reportType, id, start_date, end_date, route){
    try{
        const handler = handlers[reportType];
        if(!handler){
            return response.status(400).json({success:false, message:'Data type incorrect'});
        }

        //Obtention of context and projectIds depending on report type
        const{context,projectIds} = await handler(id, start_date, end_date);
        let ids;

        if(reportType == 'PROJECT'){
            ids = projectIds; 
        }
        else{
            ids = projectIds.map(p => p.project_id);
        }        

        console.log(ids);

        //Obtention of remaining data depending on projectIds
        const [activities, goals, achievements,prompts] = await Promise.all([
            Activity.getProjectActivities(ids,start_date,end_date),
            Goal.getProjectGoals(ids, start_date, end_date),
            Achievement.getProjectAchievements(ids, start_date, end_date),
            Prompt.getPromptByType(reportType)
        ]);

        let normalizedActivities = '';

        //Normalization of activities
        switch (reportType){
            case 'TEAM':
                normalizedActivities = groupByThreeLevels(activities[0], 'p','t','e');
            break;

            default:
                normalizedActivities = groupByTwoLevels(activities[0],'p','t');
            break;
        }

        //Normalization of goals and achievements
        const normalizedGoals = groupBy(goals[0], 'p');
        const normalizedAchievements = groupBy(achievements[0], 'p');

        let enrichedProjects;

        if(reportType == 'PROJECT'){
            enrichedProjects = {
                goals: normalizedGoals,
                achievements: normalizedAchievements,
                activities: normalizedActivities
            }
        }
        else{
            enrichedProjects = projectIds.map(project => ({
                ...project,
                goals: normalizedGoals[project.project_id] || [],
                achievements: normalizedAchievements[project.project_id] || [],
                activities: normalizedActivities[project.project_id] || []
            }));
        }
        
        //Prompts normalization
        const promptsOrdered = prompts[0].map(prompt => ({
            name: prompt.name,
            prompt:prompt.description,
            schema:prompt.schema
        }))
        
        //Return of the information
        return{
            context: context,
            projects: enrichedProjects,
            prompts: promptsOrdered
        }
        

    }
    catch(error){
        console.log(error);
        return response.status(500).json({success:false, message:'Data obtention failed'});
    }
}

//----------------------------------------------


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

exports.generateReport = async (request, response, next)=>{
    const { type, id, start_date, end_date, route } = normalizeReportRequest(request.body);
    const AiWrapper = await getAiWrapper();
    console.log(start_date);
    console.log(end_date);
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const reportType = normalizeReportType(type);

    if (!type || !id || !start_date || !end_date) {
        request.session.error = 'Complete the report type, subject, and date range before generating a report.';
        return response.redirect(route);
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        request.session.error = 'Select a valid report date range.';
        return response.redirect(route);
    }

    if (startDate.getTime() > endDate.getTime()) {
        request.session.error = 'The start date must be before the end date.';
        return response.redirect(route);
    }

    //Context + Data Obtention
    const {context, projects, prompts} = await getContext(reportType, id, start_date, end_date, route);   

    //Report Generation
    //What went well? section

    const pLimit = (await import("p-limit")).default;
    const limit = pLimit(3);
    const promises = [];

    let promptBeBetter = prompts.find(p => p.name === "BeBetter");

    for (const [projectId, projectData] of Object.entries(projects)) {
        let collective = {
            context: context,
            project: projectData,
        };

        const promise = limit(async () => {
            const section = await AiWrapper.beBetterProject(
                collective, 
                promptBeBetter.prompt, 
                promptBeBetter.schema);
            return { projectId, section};
        });

        promises.push(promise);
    }

    const results = await Promise.all(promises);
    const hasGoneWell = {};
    for (const { projectId, section } of results) {
    hasGoneWell[projectId] = section;
    }

    // Team Impact Section
    let TeamImpact = false;

    if(reportType == 'TEAM'){
        console.log('TEAM HERE');
        let promptTeamImpact = prompts.find(p => p.name === "TeamImpact");
        TeamImpact = await AiWrapper.teamImpact(projects, promptTeamImpact.prompt,promptTeamImpact.schema); 
    }


    // What can be improved SEction
    let promptWhatToImprove = prompts.find(p => p.name === "Improve");
    const whatToImprove = await AiWrapper.whatToImprove(hasGoneWell, promptWhatToImprove.prompt,promptWhatToImprove.schema);


    // Assembly of the report object
    const sections = [];

    sections.push(buildWhatWentWellSection(hasGoneWell));
    if (TeamImpact) {
    sections.push(normalizeSection(TeamImpact));
    }
    sections.push(normalizeSection(whatToImprove));

    const reportObject = {
        title: context.name,
        sections, 
    };

    const {model, version} = AiWrapper.getModelDetails();

    const content_json = {
        context: context,
        projects: projects
    }

    const filters_json = {
        startDate: start_date,
        endDate: end_date,
        id: id,
        type: reportType
    }

    //Report Object creation

    const report = new Report(request.session.employeeId, id, reportType, start_date, end_date, content_json, filters_json, model, version, reportObject);
    report.save().then(()=>{
        //LatestReports obtention
        Report.fetchLatestReport(request.session.employeeId, id).then(([reports, fieldData])=>{

            //TODO: Implement AJAX reload. Modification of the generateReport modal.

            Search.getNameFromId(reports[0].content_id).then(([name, fieldData])=>{

                const responsePayload = {
                    id: reports[0].report_id,
                    subjectLabel: name[0].full_name,
                    createdAt: reports[0].created_at,
                    periodStart: reports[0].period_start,
                    periodEnd: reports[0].period_end,
                    type: reports[0].content_type
                };

                if (request.xhr || request.headers.accept?.includes('json')) {
                    return response.status(200).json(responsePayload);
                }
                else{
                    return res.redirect(`/reports/view/${reports[0].content_type.toLowerCase()}/${reports[0].report_id}`);
                }

            }).catch((error)=>{
                console.log(error);
                return response.status(500).json({success:false, message: 'Report name obtention failed. Try again.'});
            })

        })  
        .catch((error)=>{
            console.log(error);
            return response.status(500).json({success:false, message: 'Latest report obtention failed. Try again.'});    
        })

    })
    .catch((error)=>{
        console.log(error);
        return response.status(500).json({success:false, message: 'Report object could not be stores successfully, Try again.'});
    })
};
