/*
Title: app.js
Last modification: March 24,2026
Modified by: Hurtado, R.
*/
const https = require("https");
const fs = require("fs");
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const navigationMiddleware = require('./src/middleware/navigationMiddleware');
const flashMessage = require('./src/middleware/flashMessage');
const renderNotFound = require('./src/utils/renderNotFound');
const compression = require("compression");
const PORT = process.env.PORT || 3000;

// const certificate = fs.readFileSync('server.cert');
// const privateKey = fs.readFileSync('server.key');

const app = express();

/* Compression middleware to optimize response sizes for faster load times and reduced bandwidth usage.*/

app.use(compression());

/*captureRawBody(request, response, buffer)
Function responsible for preserving request raw payload for webhook
signature validation (Slack).*/

const captureRawBody = function captureRawBody(request, response, buffer) {
    if (buffer && buffer.length > 0) {
        request.rawBody = buffer.toString('utf8');
    }
};

app.use(express.json({
    verify: captureRawBody,
}));

//Creation of static folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'src', 'public')));

//Web application graphic engine declaration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);

//bodyParser declaration.
const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: false,
    verify: captureRawBody,
}));
app.use(bodyParser.urlencoded({extended: false}));

//fileStorage: configuration for storing uploaded images.
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        let uploadFolder = 'accounts';

        if (request.originalUrl.startsWith('/team') || request.originalUrl.startsWith('/teams')) {
            uploadFolder = 'teams';
        }

        callback(null, path.join(__dirname, 'src', 'public', 'images', uploadFolder));
    },
    filename: (request, file, callback) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
        callback(null, `${timestamp}-${safeOriginalName}`);
    },
});

const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
        return;
    }

    request.fileValidationError = request.originalUrl.startsWith('/account')
        || request.originalUrl.startsWith('/admin/accounts')
        ? 'Profile image must be a PNG or JPG file.'
        : 'Team image must be a PNG or JPG file.';
    callback(null, false);
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

/*Configuracion de Environment Variables*/
require('dotenv').config();

//Usage of express-session
/*Instalacion de express-session*/
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,        
    saveUninitialized: false, 
}));


/*Instalacion de csurf*/
const csrf = require('csurf');
const csrfProtection = csrf();

/*Middleware responsible for bypassing CSRF validation only for Slack
webhook endpoint, while preserving CSRF for the rest of the app.*/
app.use((request, response, next) => {
    if (request.path.startsWith('/daily-entries/slack')) {
        next();
        return;
    }

    csrfProtection(request, response, next);
}); 

//Flash Message declaration
app.use(flashMessage);

//Uso de Auth middleware
const isAuth = require('./src/middleware/isAuthenticated');

//Routes declaration
app.use(navigationMiddleware);

//Auth
const routesAuth = require('./src/modules/auth/auth.routes');
app.use('/', routesAuth);

//routesHome
const routesHome = require('./src/modules/home/home.routes');
app.use('/home', routesHome);

//DailyEntry
const routesDailyEntry = require('./src/modules/dailyentry/dailyentry.routes');
app.use('/daily-entries', routesDailyEntry);

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

//Manuals
const routesManual = require('./src/modules/manual/manual.routes');
app.use('/manuals', routesManual);

//Admin
const routesAdmin = require('./src/modules/admin/admin.routes');
app.use('/admin', routesAdmin);

app.use((error, request, response, next) => {
    if (error.code !== 'EBADCSRFTOKEN') {
        next(error);
        return;
    }

    request.session.error = 'Your form expired. Please try again.';
    response.redirect(request.get('Referrer') || '/');
});

app.use(renderNotFound);

//Any additional route outside our domain
// https.createServer({ key: privateKey, cert: certificate }, app).listen(process.env.PORT || 3000);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
