var Person = require('../models/person.js');

module.exports.getData = function(req, res){
    Person.query('SELECT * FROM person', function (err, results, fields) {
        if (err) throw err;
        res.json({data: results});
    })
}

module.exports.postData = function(req, res){
    var person = new Person(req.body);
    person.save(function(err){
        if(err) throw err;
        res.status(200).send("You have added a new person");
    })
}