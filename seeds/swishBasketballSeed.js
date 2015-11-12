/* Swish Basketball Seed File */

var json = require('json');
	mongoose = require('mongoose');
	player = require('../models/swishModel.js');
	swishData = require('../crawlers/cache/swishBasketball.json')
	q = require('q');
	db = require('../db.js').db

var wipeDB = function () {
   	player.find({}).remove(function () {});
    return q.resolve();
};

var seed = function(){
	return player.create(swishData)
}

mongoose.connection.once('open', function(){
	wipeDB()
	.then(seed)
	.then(function(){process.exit()});
})