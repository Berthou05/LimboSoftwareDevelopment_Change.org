const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'unitas_system',
    password: '',
});

module.exports = pool.promise();