/*
 * Environment defaults for local development.
 * In production these values should come from process environment variables.
 */
const PORT = Number(process.env.PORT) || 3001;
const SESSION_SECRET = process.env.SESSION_SECRET || 'unitas-prototype-secret';

module.exports = {
    PORT,
    SESSION_SECRET,
};
