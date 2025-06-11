const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'tri',
    password: 'tri',
    database: 'tri',
});

export default connection;