/*
Title: auth.controller.js
Last modification: March 25,2026
Modified by: Hurtado, R.
*/

const Account = require('../../models/account');
const Employee = require('../../models/employee');
const AccountRole = require('../../models/accountRoleAssignment');
const bcrypt = require('bcrypt');


/*getSignin
Function that renders the sign in form.
Only avaible with privilege ADMIN-03*/

exports.getSignin=(request, response, next) => {
    return response.render('signin.ejs', {
        csrfToken: request.csrfToken(),
    });
}

/*postSignin
Function responsible for handling the employee, account creation,
and role assignation.
Only avaible with privilege ADMIN-03*/

exports.postSignin=(request, response, next) => {
    const fullname = request.body.name+" "+request.body.lastname;
    const employee = new Employee(fullname, request.body.names, request.body.lastnames);
    const employee_id = '';
    const account_id = '';
    employee.save().then(()=>{
        employee_id=Employee.getEmployeeIdByFullname(fullname);
        const account = new Account(employee_id, request.body.email, request.body.password, request.body.slack_username);
        account.save().then(()=>{
            account_id = Account.getAccountIdByEmailSlack(request.body.email, request.body.slack_username);
            const accountRole = new AccountRole(account_id, request.body.role_id);
            accountRole.save().then(()=>{
                return response.redirect('/accountAdmin');
            })
            .catch((error)=>{
                console.log(error);
                return response.redirect('/');
            })
        })
        .catch((error)=>{
            console.log(error);
            return response.redirect('/');
        })
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/');
    })
};

/*getLogin
Function responsible for rendering login page.
Available without authentication*/

exports.getLogin = (request, response, next)=>{
    const error = request.session.error || '';
    request.session.error='';
    return response.render('pages/login.ejs', {
        csrfToken: request.csrfToken(),
        error:error,
        isLoginPage: true, 
        page: 'pages/content/login', 
        pageTitle: 'Login'
    });
}

/*postLogin
Function responsible for processing the login form information
validation: existance of account, password matching, privilege loading.
Available without authentication*/

exports.postLogin = (request, response, next)=>{
    console.log("BODY:", request.body);
    Account.fetchByEmail(request.body.email).then(([rows,fieldData])=>{
        if(rows.length<1){
            request.session.error = 'Email not found';
            console.log("Email not found");
            return response.redirect('/');
        }else{
            bcrypt.compare(request.body.password, rows[0].password_hash).then((doMatch)=>{
                if(doMatch){
                    request.session.isAuth = true;
                    Employee.getNamesByEmployeeId(rows[0].employee_id).then((names)=>{
                        request.session.username = names;

                        Account.getPrivilegesFromAccountId(rows[0].account_id).then(([privileges, fieldData])=>{
                            request.session.privileges = privileges;
                            console.log(privileges);

                            return request.session.save((error) => {
                                return response.redirect('/home');
                            });

                        })
                        .catch((error)=>{
                            console.log(error);
                            return response.redirect('/');
                        })

                    })
                    .catch((error)=>{
                        console.log(error);
                        return response.redirect('/');
                    })                        
                        
                } else {
                    request.session.error = 'Password does not match';
                    console.log("Password does not match");
                    return response.redirect('/');
                }
            })
            .catch((error)=>{
                console.log(error);
                return response.redirect('/');
            });
        };
    })
    .catch((error)=>{
        console.log(error);
        return response.redirect('/');
    });
}

/*getLogout
Function responsible for logout the current session.
Only available for authenticated users.*/

exports.getLogout = (request, response, next)=>{
    request.session.destroy(() => {
        return response.redirect('/');
    });
}