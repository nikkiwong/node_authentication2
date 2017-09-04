var express = require('express');
var router = express.Router();

//controllers
var dataController = require('../server/controllers/data-controllers');
var authenticateController = require('../server/controllers/authenticate-controllers');

var db = require('../server/config/config.js');


router.get('/authenticate', authenticateController.authenticate);

router.get('/get-data', dataController.getData);

router.post('/post-data', dataController.postData);

module.exports = router;