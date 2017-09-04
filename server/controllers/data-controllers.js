var Person = require('../models/person.js');

module.exports.getData = function(req, res){
    Person.query('SELECT * FROM person', function (err, results, fields) {
        if (err) throw err;
        res.json({data: results});
    })
}

module.exports.postData = function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    
    Person.query('INSERT INTO person (firstName, lastName) VALUES(?, ?)', [firstName, lastName], function (err, results, fields) {
        if (err) throw err;
        res.status(200).send("You have added a new person");
    })
}