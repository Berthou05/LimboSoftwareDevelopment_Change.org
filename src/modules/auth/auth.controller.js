/*
Title: auth.controller.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const Account = require('../../models/account');
const Employee = require('../../models/employee');
const bcrypt = require('bcrypt');

exports.getSignin=(request, response, next) => {
    response.render('signin.ejs', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || '',
        username: request.session.username || '',
    });
}

//! Modify based on Account model
/*
Employee names
Employee lastnames
Account	email
Account password
Account	slack_username
Account	image
*/
exports.postSignin=(request, response, next) => {
    const full_name = request.body.name+" "+request.body.lastname;
    const employee = new Employee(full_name, request.body.names, request.body.lastnames);
    const employee_id = '';
    employee.save().then(()=>{
        employee_id=Employee.getEmployeeIdByFullname(full_name);
        const account = new Account(employee_id, request.body.email, request.body.password, request.body.slack_username);
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/auth/login');
    })
};


exports.getLogin = (request, response, next)=>{
    const error = request.session.error || '';
    request.session.error='';
    response.render('pages/login', {
        csrfToken: request.csrfToken(),
        username: request.session.username || '',
        isLoggedIn: request.session.isLoggedIn || '',
        error:error,
    });
}

//! Modify based on Account model
// exports.postLogin = (request, response, next)=>{
//     User.fetchOne(request.body.email).then(([rows,fieldData])=>{
//         console.log(rows);
//         if(rows.length<1){
//             request.session.error = 'Usuario y/o password no coinciden';
//             return response.redirect('/users/login');
//         }else{
//             bcrypt.compare(request.body.password, rows[0].password).then((doMatch)=>{
//                 if(doMatch){
//                     console.log("Logged In");
//                     request.session.isLoggedIn = true;
//                     request.session.username = request.body.username;

//                     if(request.session.username == process.env.SPECIAL_USER){
//                         request.session.isSpecialUser = true;
//                     }
//                     User.getPrivileges(request.body.username).then(([privileges, fieldData])=>{
//                         request.session.privileges = privileges;                        
//                         return request.session.save((error) => {
//                             return response.redirect('/all');
//                         });
                        
//                     }).catch((error)=>{
//                         console.log(error);
//                         return response.redirect('/');
//                     })
//                 } else {
//                     request.session.error = 'Usuario y/o password no coinciden';
//                     return response.redirect('/users/login');
//                 }
//             })
//             .catch((error)=>{
//                 console.log(error);
//                 return response.redirect('/');
//             });
//         };
//     })
//     .catch((error)=>{
//         console.log(error);
//         return response.redirect('/');
//     });
// }

exports.getLogout = (request, response, next)=>{
    request.session.destroy(() => {
        return response.redirect('/auth/login');
    });
}