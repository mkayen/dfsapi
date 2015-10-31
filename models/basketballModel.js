/* NumberFire Basketball players Model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db.js').db // Come back to this.

var basketballPlayersSchema = new mongoose.Schema({
	id:{
		type: Number,
		ref: 'id'
	},
	name:{
		type: String,
		ref: 'name'
	},
	team:{
		type: String
	},
	position:{
		type: String,
		ref: 'position'
	},
	fanduel_fp:{
		type: Number
	},
	fanduel_salary:{
		type: Number
	},
	fanduel_ratio:{
		type: Number
	}
});

var nfBasketballModel = mongoose.model('nfBasketballPlayer', basketballPlayersSchema)

module.exports = nfBasketballModel;