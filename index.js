const connected = require('./app/config/data.json');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session');
const app = express();

app.use(session({
    httpOnly: true,
    key: 'my key',
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store : MySQLStore({
        host : connected.host,
        user : connected.user,
        password : connected.password,
        port : connected.port,
        database : connected.database
    })
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const port = 3000;
app.listen(port, hostname => {
    console.log('Server listening on port', port)
});

app.use('/api/member', require('./app/routes/routes.js'))