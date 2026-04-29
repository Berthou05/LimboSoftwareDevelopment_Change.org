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
const Highlight = require('../../models/highlight');
const Goal = require('../../models/goal');
const Prompt = require('../../models/prompt');
const Report = require('../../models/report');
const Search = require('../../models/search');
const renderNotFound = require('../../utils/renderNotFound');
const { end } = require('../../utils/database');


//---------------------- Auxiliar functions ---------------------------

/*getAiWrapper()
Function responsible for loading the AI wrapper ESM module from a
CommonJS controller.*/

const getAiWrapper = async function getAiWrapper() {
    return import('../../utils/webServices/aiWrapper.mjs');
};

/*capitalizeWords(str)
Function responsible for capitalizig the first char of each word of the given string*/
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

const REPORT_HISTORY_LIMIT = '100';

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

const buildReportHistoryCards = function buildReportHistoryCards(reports, redirectTo = '/reports') {
    return reports.map((report) => ({
        id: report.report_id,
        subjectLabel: report.subject_name || 'Unknown subject',
        type: report.content_type || '',
        createdAt: report.created_at || null,
        periodStart: report.period_start || null,
        periodEnd: report.period_end || null,
        url: `/reports/view/${String(report.content_type || '').toLowerCase()}/${report.report_id}`
            + `?redirectTo=${encodeURIComponent(redirectTo)}`,
    }));
};

const normalizeReportHistoryFilters = function normalizeReportHistoryFilters(query = {}) {
    const type = normalizeReportType(query.type) || 'ALL';
    const subject = typeof query.subject === 'string' ? query.subject.trim() : '';
    const startDate = typeof query.startDate === 'string' ? query.startDate.trim() : '';
    const endDate = typeof query.endDate === 'string' ? query.endDate.trim() : '';

    return {
        type,
        subject,
        startDate,
        endDate,
        limit: REPORT_HISTORY_LIMIT,
    };
};

/*respondWithError(statusCode, message, wantsJson, response, request)
Auxiliar function responsible for handling error of the report generation
in a similar way that enforces the application of the flash report
messages.*/

function respondWithError(statusCode, message, wantsJson, response, request) {
    const flash = {
        type: 'error',
        message
    };

    if (wantsJson) {
        return response.status(statusCode).json({
            success: false,
            flash
        });
    }

    request.session.reportGeneratorFlash = flash;
    return response.redirect(route);
};

/*groupBy(array, key)
Auxiliar function responsible for the grouping and integration
of elements of an array by a given key.*/

function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
    }, {});
}

/*groupByTwoLevels(array, key)
Auxiliar function responsible for the grouping and integration
of elements of an array by two given keys depending
on their order.*/

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

/*normalizeSection(section)
Auxiliar function responsible for the normalization of a given AI section
in order to match the report visualization structure.*/

function normalizeSection(section) {
    const normalized = {
        title: section.title,
    };

    if (section.groups && section.groups.length > 0) {
        normalized.groups = section.groups.map(group => {
        const g = {
            title: group.title,
        };

        if (group.subgroups && group.subgroups.length > 0) {
            g.subgroups = group.subgroups.map(sub => ({
            title: sub.title,
            items: sub.items ?? [],
            }));
        } else if (group.items && group.items.length > 0) {
            g.items = group.items;
        }

        return g;
        });
    } else if (section.items && section.items.length > 0) {
        normalized.items = section.items;
    }

    return normalized;
}

/*buildWhatWentWellSection(wentWell, reportType)
Auxiliar function responsible for the normalization of the section
What Went Well of Reports, changing over thier title depending
on the reportType.*/

function buildWhatWentWellSection(wentWell, reportType) {
    const groups = Object.values(wentWell).map(project => {
        const group = {
        title: project.title,
        };

        if (project.subgroups && project.subgroups.length > 0) {
        group.subgroups = project.subgroups;
        } else if (project.items && project.items.length > 0) {
        group.items = project.items;
        }

        return group;
    });

    return {
        title: reportType=='PROJECT'? "What has been done?" :"What went well?" ,
        groups,
    };
}

/*buildStatusSection(status, reportType)
Auxiliar function responsible for the normalization of the section
Projects Status of Reports, changing over thier title depending
on the reportType.*/

function buildStatusSection(status, reportType) {
    const groups = Object.values(status).map(project => ({
        title: project.title || '',
        projectStatus: project.projectStatus || '',
        projectLead: project.projectLead || '',
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        items: project.items || []
    }));

    return {
        title: reportType === 'PROJECT' ? "Status" : "Project's Status",
        groups,
    };
}

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

/*normalizeReportType(value = '')
Auxiliar function responsible for the validation of the reportType*/

const normalizeReportType = function normalizeReportType(value = '') {
    const reportType = String(value || '').trim().toUpperCase();

    if (reportType === 'EMPLOYEE' || reportType === 'TEAM' || reportType === 'PROJECT') {
        return reportType;
    }

    return '';
};

/*ensureReportExists
Auxiliar function responsible for the existance validation of a report
based on its id.*/

exports.ensureReportExists = (request, response, next) => {
    return Report.fetchById(request.params.id)
        .then(([reportRows]) => {
            if (!reportRows.length) {
                return renderNotFound(request, response);
            }

            return next();
        })
        .catch(next);
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
        const [activities] = await Activity.getNullProjectActivities(employee_id,start_date, end_date);

        if(activities.length > 0){
            project_ids.push({project_id: null, name: 'General Activities'});
        }

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
            startDate: project_info[0].start_date,
            endDate: project_info[0].end_date,
            lead: project_info[0].full_name,
            status: project_info[0].status
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

async function getContext(reportType, id, start_date, end_date, route, wantsJson, response, request, isBetween){
    try{
        const handler = handlers[reportType];
        if(!handler){
            return respondWithError(400, 'Invalid Report data type. A report can not be generated. Try again with a different data type.',wantsJson, response, request);
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

        console.log(projectIds);

        //Obtention of remaining data depending on projectIds
        const [activities, goals, achievements, highlights, prompts] = await Promise.all([
            Activity.getProjectActivities(ids,start_date,end_date),
            Goal.getProjectGoals(ids, start_date, end_date),
            Achievement.getProjectAchievements(ids, start_date, end_date),
            Highlight.getProjectHighlights(ids, start_date, end_date),
            Prompt.getPromptByType(reportType)
        ]);

        let normalizedActivities = '';
        let activityDate = null;

        if(activities[0].length == 0){
            return respondWithError(400, 'No activities between the selected range. A report can not be generated. Try again with a different date range.',wantsJson, response, request);
        }
        else{
            activityDate = new Date(activities[0][0].completed_at);
        }

        //Normalization of activities
        switch (reportType){
            case 'TEAM':
                normalizedActivities = groupByTwoLevels(activities[0], 'p','t');
            break;

            default:
                normalizedActivities = groupByTwoLevels(activities[0],'p','e');
            break;
        }

        //Normalization of goals and achievements
        const normalizedGoals = groupBy(goals[0], 'p');
        const normalizedAchievements = groupBy(achievements[0], 'p');
        const normalizedHighlights = groupBy(highlights[0], 'p');

        let enrichedProjects;

        if(reportType == 'PROJECT'){
            enrichedProjects = [{
                project_id:ids[0],
                goals: normalizedGoals[projectIds[0]],
                achievements: normalizedAchievements[projectIds[0]],
                activities: normalizedActivities[projectIds[0]],
                highlights: normalizedHighlights[projectIds[0]],
            }]
        }
        else{
            enrichedProjects = projectIds.map(project => ({
                ...project,
                goals: normalizedGoals[project.project_id] || [],
                achievements: normalizedAchievements[project.project_id] || [],
                activities: normalizedActivities[project.project_id] || [],
                highlights: normalizedHighlights[project.project_id] || []
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
            prompts: promptsOrdered,
            activityDate,
        }
        
    }
    catch(error){
        console.log(error);
        return respondWithError(500, 'Data obtention failed',wantsJson,response, request);
    }
}

//---------------------- Main functions ---------------------------

exports.getReportHistory = (request, response, next) => {
    const employeeId = request.session.employeeId || '';
    const filters = normalizeReportHistoryFilters(request.query);

    return Promise.all([
        Report.fetchHistoryByEmployee(employeeId, filters),
        Report.fetchHistorySubjectsByEmployee(employeeId),
    ]).then(([[reports], [subjects]]) => {
        return response.render('pages/reportHistory', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || '',
            username: request.session.username || '',
            pageTitle: 'Report history',
            pageSubtitle: 'Your generated reports in one filtered table.',
            reports: buildReportHistoryCards(reports),
            subjects: subjects.map((subject) => ({
                name: subject.subject_name || 'Unknown subject',
                type: subject.content_type || '',
            })),
            filters,
        });
    }).catch((error) => {
        console.log(error);
        request.session.error = 'The report history could not be loaded.';
        return response.redirect('/home');
    });
};

/*getReport
Function responsible for rendering a report page based on the given report_id.*/

exports.getReport = (request, response, next) => {
    const reportType = normalizeReportType(request.params.content_type || request.query.type || 'EMPLOYEE') || 'EMPLOYEE';
    const redirectTo = typeof request.query.redirectTo === 'string'
        ? request.query.redirectTo
        : '/home';

    Report.fetchById(request.params.id).then(([report,fieldData])=>{
        const reportRow = report[0];

        if (!reportRow) {
            return renderNotFound(request, response);
        }

        Search.getNameFromId(reportRow.content_id).then(([name, fieldData])=>{
            const subject = name[0];

            if (!subject) {
                return renderNotFound(request, response);
            }

            const filters = typeof reportRow.filters_json === 'string'
                ? JSON.parse(reportRow.filters_json)
                : reportRow.filters_json;

            return response.render('pages/report',{
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || '',
                username: request.session.username || '',
                pageTitle: subject.name, 
                title: subject.name,
                start_date: filters.startDate,
                end_date: filters.endDate,
                keyRange: typeof filters.key !== 'undefined' || typeof filters.key !== 'null' ? capitalizeWords(filters.key) : null,
                activityDate: typeof filters.activityDate !== 'null' ? filters.activityDate : null,
                pageSubtitle: '',
                reportType: reportRow.content_type,
                reportFormat: JSON.parse(reportRow.ai_output_text),
                redirectTo,
            });
        })
        .catch((error)=>{
            console.log(error);
            request.session.error = 'The report could not be loaded.';
            return response.redirect(redirectTo); 
        })
    })
    .catch((error)=>{
        console.log(error);
        request.session.error = 'The report could not be loaded.';
        return response.redirect(redirectTo);
    })
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

exports.generateReport = async (request, response, next)=>{
    const { type, id, start_date, end_date, route } = normalizeReportRequest(request.body);
    const AiWrapper = await getAiWrapper();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const reportType = normalizeReportType(type);
    const wantsJson = request.xhr || request.headers.accept?.includes('json');
    const presetKey = request.body.presetKey;
    const today = new Date();
    const isBetween = today >= startDate && today <= endDate;

    if (!type || !id || !start_date || !end_date) {
        return respondWithError(400, 'Complete the report type, subject, and date range before generating a report.', wantsJson, response, request);
    }

    if (!reportType) {
        return respondWithError(400, 'Select a valid report type before generating a report.', wantsJson, response, request);
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return respondWithError(400, 'Select a valid report date range.', wantsJson,response, request);
    }

    if (startDate.getTime() > endDate.getTime()) {
        return respondWithError(400, 'The start date must be before the end date.',wantsJson,response, request);
    }

    //Context + Data Obtention
    const {context, projects, prompts, activityDate} = await getContext(reportType, id, start_date, end_date, route, wantsJson, response, request, isBetween);  
    
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
                promptBeBetter.schema,
                reportType);
            return { projectId, section};
        });

        promises.push(promise);
    }

    const results = await Promise.all(promises);
    const hasGoneWell = {};
    for (const { projectId, section } of results) {
        hasGoneWell[projectId] = section;
    };

    //Statuses Sections
    let status = false;
    if(reportType == 'TEAM' || reportType == 'PROJECT'){
        const statusPromises = [];
        // let promptStatus = prompts.find(p => p.name === "Status");

        for (const [projectId, projectData] of Object.entries(projects)) {
            let collective = {
                context: context,
                project: projectData,
                today
            };

            const promise = limit(async () => {
                const section = await AiWrapper.getStatus(
                    collective,
                    '',
                    '',
                    reportType);
                return { projectId, section};
            });

            statusPromises.push(promise);
        }

        const statusResults = await Promise.all(statusPromises);
        status = {};
        for (const { projectId, section } of statusResults) {
            status[projectId] = section;
        };

        console.log(status);
    }

    // What can be improved Section
    const promptWhatToImprove = prompts.find(p => p.name === "Improve");
    const allInfo = {
        context: context,
        projects: projects,
        hasGoneWell: hasGoneWell
    }
    const whatToImprove = await AiWrapper.whatToImprove(allInfo, promptWhatToImprove.prompt,promptWhatToImprove.schema, reportType);

    // Team Impact Section
    let TeamImpact = false;

    if(reportType == 'TEAM'){
        let promptTeamImpact = prompts.find(p => p.name === "TeamImpact");
        TeamImpact = await AiWrapper.teamImpact(projects, promptTeamImpact.prompt,promptTeamImpact.schema);
    }

    let HasBeenDone = false;
    if(reportType == 'PROJECT'){
        // let promptProjectWell = prompts.find(p => p.name === "BeDone");
        let object = {
            context,
            projects,
            today
        }
        HasBeenDone = await AiWrapper.whatHasBeenDone(object);
    }

    let companyValues = false;
    if(!(reportType == 'PROJECT')){
        let valuesPrompt = prompts.find(p => p.name === "Values");
        companyValues = await AiWrapper.companyValues(hasGoneWell, valuesPrompt.prompt, valuesPrompt.schema, reportType);
    }

    // Assembly of the report object
    const sections = [];
    if (TeamImpact) {
        sections.push(normalizeSection(TeamImpact));
    }
    if(status){
        sections.push(buildStatusSection(status, reportType));
    }
    if (HasBeenDone) {
        sections.push(normalizeSection(HasBeenDone));
    }
    sections.push(buildWhatWentWellSection(hasGoneWell,reportType));
    sections.push(normalizeSection(whatToImprove));
    if (companyValues) {
        sections.push(normalizeSection(companyValues));
    }

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
        startDate: startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }),
        endDate: endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }),
        activityDate: activityDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }),
        id: id,
        type: reportType,
        key: presetKey
    }

    //Report Object creation

    const report = new Report(request.session.employeeId, id, reportType, start_date, end_date, content_json, filters_json, model, version, reportObject);
    report.save().then(()=>{
        //LatestReports obtention
        Report.fetchLatestReport(request.session.employeeId, id).then(([reports, fieldData])=>{

            Search.getNameFromId(reports[0].content_id).then(([name, fieldData])=>{

                const responsePayload = {
                    id: reports[0].report_id,
                    subjectLabel: name[0].name,
                    createdAt: reports[0].created_at,
                    periodStart: reports[0].period_start,
                    periodEnd: reports[0].period_end,
                    type: reports[0].content_type
                };

                if (wantsJson) {
                    return response.status(200).json({
                        success: true,
                        ...responsePayload,
                        flash: {
                            type: 'success',
                            message: 'Report generated successfully.'
                        }
                    });
                }

                request.session.reportGeneratorFlash = {
                    type: 'success',
                    message: 'Report generated successfully.'
                };
                return response.redirect(`/reports/view/${reports[0].content_type.toLowerCase()}/${reports[0].report_id}?redirectTo=${encodeURIComponent(route)}`);

            }).catch((error)=>{
                console.log(error);
                return respondWithError(500,'Report name obtention failed. Try again.',wantsJson, response, request);
            })

        })  
        .catch((error)=>{
            console.log(error);
            return respondWithError(500, 'Latest report obtention failed. Try again.',wantsJson, response, request);
        })

    })
    .catch((error)=>{
        console.log(error);
        return respondWithError(500, 'Report object could not be stored successfully, Try again.',wantsJson, response, request);
    })
};
