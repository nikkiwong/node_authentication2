var mysql = require('mysql');
var person = require('../config/config.js')

person.query('INSERT INTO person (firstName, lastName) VALUES(?, ?)', [firstName, lastName]);

module.exports = person;