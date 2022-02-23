const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { hostname } = require('os');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const port = 3000;
app.listen(port, hostname => {
    console.log('Server listening on port', port)
});

app.get("/", (req, res) => {
    res.send("server connect");
  });

app.use('/api/member', require('./app/routes/routes.js'))