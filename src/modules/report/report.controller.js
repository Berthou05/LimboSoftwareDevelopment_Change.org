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

exports.getReport = (request, response, next) => {
    const reportType = normalizeReportType(request.params.content_type || request.query.type || 'EMPLOYEE') || 'EMPLOYEE';
    const reportFormat = REPORT_FORMATS[reportType];
    const redirectTo = typeof request.query.redirectTo === 'string'
        ? request.query.redirectTo
        : '/home';

    return response.render('pages/report',{
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || '',
        username: request.session.username || '',
        pageTitle: reportFormat.title,
        pageSubtitle: 'Simple preview of the selected report format.',
        reportType,
        reportFormat,
        redirectTo,
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

    


    //TODO: Review code
    request.session.error = `Report generation for ${type}:${id} is still under development.`;
    return response.redirect(route);
};
