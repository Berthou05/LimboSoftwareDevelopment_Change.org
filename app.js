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
app.use('/auth', routesAuth);

//routesHome
const routesHome = require('./src/modules/home/home.routes');
app.use('/home', routesHome);

// Render login.ejs directly at root
app.get('/', (req, res) => res.render('pages/login', { isLoginPage: true, page: 'pages/content/login', pageTitle: 'Login' }));
app.get('/login', (req, res) => res.render('pages/login', { isLoginPage: true, page: 'pages/content/login', pageTitle: 'Login' }));

//Search
const routesSearch = require('./src/modules/search/search.routes');
app.use('/search', routesSearch);

//Employee
const routesEmployee = require('./src/modules/employee/employee.routes');
app.use('/employee', routesEmployee);
app.use('/employees', routesEmployee);

//Team
const routesTeam = require('./src/modules/team/team.routes');
app.use('/team', routesTeam);
app.use('/teams', routesTeam);

//Project
const routesProject = require('./src/modules/project/project.routes');
app.use('/project', routesProject);
app.use('/projects', routesProject);

//Account 
const routesAccount = require('./src/modules/account/account.routes');
app.use('/account', routesAccount);

//Report
const routesReport = require('./src/modules/report/report.routes');
app.use('/reports', routesReport);

//Admin
const routesAdmin = require('./src/modules/admin/admin.routes');
app.use('/admin', routesAdmin);


//Any additional route outside our domain
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
