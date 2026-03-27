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
    const { type, id, start_date, end_date, route } = normalizeReportRequest(request.body);
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

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

    //TODO: Review code
    request.session.error = `Report generation for ${type}:${id} is still under development.`;
    return response.redirect(route);
};
