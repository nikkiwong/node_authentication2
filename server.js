//app is for open API

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var secureRoutes = express.Router();
require('dotenv').config();

//controllers
var dataController = require('./server/controllers/data-controllers');
var authenticateController = require('./server/controllers/authenticate-controllers');
process.env.SECRET_KEY = "mysecretkey";
//this process.env allows the process to be available all throughout the application

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/secure-api', secureRoutes);

var db = require('./server/config/config.js');

app.get('/api/authenticate', authenticateController.authenticate);
app.get('/api/get-data', dataController.getData);


//validation middleware
secureRoutes.use(function(req, res, next){
    var token = req.body.token || req.headers['token'];
    //gives users 2 ways to pass token to us, either in body or in header itself
    if (token){
//        res.send("we have a token");
//        //api can see that we have a token
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            if (err){
                res.status(500).send("invalid token");
            }else{
                next();
            }
        })
        
    }else{
        res.send("Please send a token");
    }
})

secureRoutes.post('/post-data', dataController.postData);
//need to verify said token.

app.listen(9000, function(){
    console.log("server is up");
    db.query('SELECT 1 + 1 AS solution', function(error, results,fields){
        if (error) throw error;
        
        console.log('The solution is: ', results[0].solution);
    })
});