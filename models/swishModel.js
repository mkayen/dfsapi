/* NumberFire Basketball players Model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db.js').db // Come back to this.

var swishPlayersSchema = new mongoose.Schema({
	player_id:{
		type: Number,
		ref: 'id'
	},
	player_name:{
		type: String,
		ref: 'name'
	},
	team_abr:{
		type: String
	},
	fd_pos:{
		type: String,
		ref: 'position'
	},
	proj_fantasy_pts_fd:{
		type: Number
	},
	fd_salary:{
		type: Number
	},
});

var swishBasketballModel = mongoose.model('swishBasketballPlayer', swishPlayersSchema)

module.exports = swishBasketballModel;