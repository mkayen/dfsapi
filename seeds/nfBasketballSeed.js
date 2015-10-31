/* NumberFire Basketball Seed File */

var json = require('json');
	mongoose = require('mongoose');
	player = require('../models/basketballModel.js');
	jsonData = require('../cache/basketballPlayers.json');
	q = require('q');
	// db = require('../db.js').db

var wipeDB = function () {
   	player.find({}).remove(function () {});
    return q.resolve();
};

var seed = function(){
	var projectionData = jsonData.daily_projections;
	var playersData = jsonData.players
	var length = projectionData.length
	for(var i = 0; i < length; i++){
		var playerId = projectionData[i].nba_player_id;
		playersDara[playerId].fanduel_fp = projectionData[i].fanduel_fp;
		playersData[playerId].fanduel_ratio = projectionData[i].fanduel_ratio
		playersData[playerId].fanduel_salary = projectionData[i].fanduel_salary
	}

	var playerArray = [];
	for(var key in playersData){
		var teamId = playersData[key].team_id;
		playersData[key].team = jsonData.teams[teamId].abbrev;
		playerArray.push(playersData[key])
	}

	return player.create(playerArray)
	proces

};

mongoose.connection.once('open', function(){
	wipeDB()
	.then(seed)
	.then(function(){process.exit()});
})