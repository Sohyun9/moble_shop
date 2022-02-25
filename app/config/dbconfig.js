const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "moble_shop"
});

var sessionStore = new MySQLStore(connection);

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.use(session({
    httpOnly: true,
    key: 'my key',
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

module.exports = connection;