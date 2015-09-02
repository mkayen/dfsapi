var fs = require('fs'),
    path = require('path'),
    config = require('./config');

var inputDir = path.join(__dirname, config.cachePath);
var data = {};

for(var position in config.urls){
    data[position] = require(path.join(inputDir, position));
}
module.exports = data;
