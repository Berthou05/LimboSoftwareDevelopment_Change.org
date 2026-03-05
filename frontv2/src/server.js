const app = require('./app');
const { PORT } = require('./config/env');

/*
 * Single process web server entrypoint.
 * Start with: `node src/server.js`.
 */
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Unitas prototype running on http://localhost:${PORT}`);
});
