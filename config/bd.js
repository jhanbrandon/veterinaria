// config/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',        
    user: 'root',             
    password: '',             
    database: 'veterinariabd' 
});

module.exports = db;
