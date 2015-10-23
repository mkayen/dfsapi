/* NumberFire Basketball players Model */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db.js').db // Come back to this.

var basketballPlayersSchema = new mongoose Schema({
	id:{
		type: Number,
		ref: 'id'
	}
})