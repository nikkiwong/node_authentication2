var mysql = require('mysql');
var express = require('express');
//express -> router that helps to build routing within application
var bodyParser = require('body-parser');
//bodyparser -> automatically take server and parser whatever user sends, inorder to manipulate that data more easily.
var app = express();

//controllers
var dataController = require('./server/controllers/data-controllers');

app.use(bodyParser.urlencoded({extended: true}));
//letting the app know that we want to use bodyParser. this allows us to parse form data
app.use(bodyParser.json());
//pass in as obj as assembling obj. Parses the obj that's sent to us by POST from client

var db = require('./server/config/config.js');

var dummyData = [];

app.get('/api/get-data', dataController.getData);

app.post('/api/post-data', dataController.postData);

app.listen(9000, function(){
    console.log("server is up");
    db.query('SELECT 1 + 1 AS solution', function(error, results,fields){
        if (error) throw error;
        
        console.log('The solution is: ', results[0].solution);
    })
});