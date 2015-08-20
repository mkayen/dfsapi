/* NumberFire Hitters Seed file */

'use strict'
var json = require("json");
var mongoose = require("mongoose");
var player = require('../models/nfHittersModel.js');
var jsonData = require('../cache/nfHitters.json');
var q = require('q')

var wipeDB = function(){
	player.find({}).remove(function() {});
	return q.resolve();
};

var seed = function(){
	/* Associate Player Projections with Player based on id (jsonData.players) 
		& player_id (jsonData.projections) */
	var projectionData = jsonData.projections;
	var playersData = jsonData.players;
	var length = projectionData.length;
	for(var i = 0; i < length; i++){
		var playerId = projectionData[i].mlb_player_id
		playersData[playerId].fanduel_fp = projectionData[i].fanduel_fp
		playersData[playerId].fanduel_ratio = projectionData[i].fanduel_ratio
		playersData[playerId].fanduel_salary = projectionData[i].fanduel_salary
	}

	/* Associate Team Abbreviation with Player based on team_id */
	var playerArray = [];
	for(var key in playersData){
		var teamId = playersData[key].team_id
		var position = playersData[key].depth_position
		playersData[key].team = jsonData.teams[teamId].abbrev;

	/* Turn object of objects into array of objects for Mongo compatibility */
		playerArray.push(playersData[key])
	}

	/* Push Data to DB */
	player.create(playerArray)
};

mongoose.connection.once('open', function(){
	wipeDB().then(seed);
})
