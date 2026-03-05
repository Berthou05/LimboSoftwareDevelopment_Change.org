const session = require('express-session');
const { SESSION_SECRET } = require('./env');

const createSessionMiddleware = function createSessionMiddleware() {
    return session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    });
};

module.exports = {
    createSessionMiddleware,
};
