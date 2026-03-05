const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const { createSessionMiddleware } = require('./config/session');
const flashMiddleware = require('./middlewares/flash.middleware');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');
const moduleRouters = require('./modules');

const app = express();

/*
 * View engine and template layout configuration.
 * - Every `res.render('...')` call uses EJS.
 * - `layout.ejs` wraps all non-auth pages.
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

/*
 * Global middleware order matters:
 * 1) body parsers and static files
 * 2) session
 * 3) flash (depends on session)
 * 4) feature routers
 * 5) error handlers
 */
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(createSessionMiddleware());
app.use(flashMiddleware);

for (const router of moduleRouters) {
    app.use('/', router);
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
