var mongoose = require('mongoose');

var DATABASE_URI = "mongodb://mkayen:Nov91990@ds031832.mongolab.com:31832/heroku_138rsq9k"
var db = mongoose.connect(DATABASE_URI).connection;

module.exports = db;