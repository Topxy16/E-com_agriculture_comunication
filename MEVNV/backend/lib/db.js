const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 3306,
});

connection.connect((error)=>{
    if(error){
        console.log('database Error');
        return;
    }else{
        console.log('database Success')
    }
})

module.exports = connection;