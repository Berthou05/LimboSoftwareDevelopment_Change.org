/*
Title: project.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
*/

const Goal = require('../../models/goal');

/*getProject
Responsible for rendering the intermediate projects page.*/

//! The current function is under development due to testing 
//! views creation.

exports.getProject = (request, response, next) => {
    response.render('pages/project',{
        csrfToken: request.csrfToken(),
    });
};

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
