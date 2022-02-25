const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  if(req.session.num) {
      req.session.num = 1;
  } else {
      req.session.num += 1;
  }

  console.log('Hello ' + req.session.num);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;
app.listen(port, hostname => {
    console.log('Server listening on port', port)
});

app.use('/api/member', require('./app/routes/routes.js'))