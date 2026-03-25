/*
Title: report.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/


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
- 
*/



exports.generateReport = (request, response, next)=>{
    //For testing purposes
    console.log(request.body);

};