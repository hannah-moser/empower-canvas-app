const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "127.0.0.1",
 user: "root",
 password: "password",
 database: "empower",

});

conn.connect();

module.exports = conn;