var mongoose = require('mongoose');

var DATABASE_URI = // You should put DB information here.
var db = mongoose.connect(DATABASE_URI).connection;

module.exports = db;
