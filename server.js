//app is for open API

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
require('dotenv').config();

//controllers
var dataController = require('./server/controllers/data-controllers');
var authenticateController = require('./server/controllers/authenticate-controllers');
process.env.SECRET_KEY = "mysecretkey";
//this process.env allows the process to be available all throughout the application

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db = require('./server/config/config.js');

app.get('/api/authenticate', authenticateController.authenticate);
app.get('/api/get-data', dataController.getData);

app.post('/api/post-data', dataController.postData);

app.listen(9000, function(){
    console.log("server is up");
    db.query('SELECT 1 + 1 AS solution', function(error, results,fields){
        if (error) throw error;
        
        console.log('The solution is: ', results[0].solution);
    })
});