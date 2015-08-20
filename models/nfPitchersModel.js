/* Numberfire Pitchers DB Model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db.js').db// Come back to this.

var nfPitchersSchema = new mongoose.Schema({
	id:{
		type: Number,
		ref: 'id'
	},
	name:{
		type: String,
		ref: 'name'
	},
	team:{
		type: String,
	},
	depth_position:{
		type: String,
		ref: 'position'
	},
	position_group:{
		type: Number
	},
	fanduel_fp:{
		type: Number
	},
	fanduel_salary:{
		type: Number
	},
	fanduel_ratio:{
		type: Number
	},
});

var nfPitcherModel = mongoose.model('nfPitcher', nfPitchersSchema)

module.exports = nfPitcherModel;
