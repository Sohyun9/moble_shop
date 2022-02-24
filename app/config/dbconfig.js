const { append } = require('express/lib/response');
const fs = require('fs');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const express = require('express');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "moble_shop"
});

var sessionStore = new MySQLStore(connection);

app.use(session({
    secret:'my key',
    resave:false,
    saveUninitialized:true,
    store: sessionStore
}));

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;