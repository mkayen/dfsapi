/* NumberFire Hitters DB Model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db.js').db // Come back to this.

var nfHittersSchema = new mongoose.Schema({
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
	swishPoints:{
		type: Number
	},
	swishValue:{
		type: Number
	}
});

var nfHitterModel = mongoose.model('nfHitter', nfHittersSchema)

module.exports = nfHitterModel;