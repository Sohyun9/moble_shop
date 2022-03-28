const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(bodyParser.json());

axios.default.withCredentials = true;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root1",
    password: "123456",
    port: "3306",
    database: "moble_shop"
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.use(cors({
    origin : true,
    credentials : true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

module.exports = connection;