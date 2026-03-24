/*
Title: app.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/

const express = require('express');
const navigationMiddleware = require('./src/middleware/navigationMiddleware');
const PORT = process.env.PORT || 3000;

const app = express();

//Creation of static folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'src', 'public')));

//Web application graphic engine declaration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//bodyParser declaration.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


//Routes declaration

app.use(navigationMiddleware);

//Auth
const routesAuth = require('./src/modules/auth/auth.routes');
app.use('/', routesAuth);

//routesHome
const routesHome = require('./src/modules/home/home.routes');
app.use('/home', routesHome);

//Search
const routesSearch = require('./src/modules/search/search.routes');
app.use('/search', routesSearch);

//Employee
const routesEmployee = require('./src/modules/employee/employee.routes');
app.use('/employee', routesEmployee);

//Team
const routesTeam = require('./src/modules/team/team.routes');
app.use('/team', routesTeam);

//Project
const routesProject = require('./src/modules/project/project.routes');
app.use('/project', routesProject);

//Account 
const routesAccount = require('./src/modules/account/account.routes');
app.use('/account', routesAccount);


//Any additional route outside our domain
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});