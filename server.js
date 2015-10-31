/* Express Server */

'use strict';
var express = require('express');
var router = require('express').Router();
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var nfHitterModel = require('./models/nfHittersModel');
var nfPitcherModel = require('./models/nfPitchersModel');
var nfBasketballModel = require('./models/basketballModel')

app.get('/', function(req, res){
	res.send('This is to test the server');
})

app.get('/api/nfPitchers', function(req, res, next){
	nfPitcherModel.find({}, function(err, data){
		res.json(data);
	});
});

app.get('/api/nfHitters', function(req, res, next){
	nfHitterModel.find({}, function(err, data){
		res.json(data);
	});
});

/* Query for any DB Parameter (exact search), where position is parameter (for pitchers) */

app.get('/api/nfPitchers/search', function(req, res, next){
	nfPitcherModel.find(req.query, function(err, data){
		if(req.query.minPoints){
			var minimum = req.query.minPoints;
			delete req.query.minPoints;
			console.log(req.query);
			nfPitcherModel.find({ $and: [req.query, {fanduel_fp: { $gt: minimum }}]}, function(err, data){
				res.json(data);
			});
		}else{
			res.json(data);	
		};
	});
});

/* Query for any DB Parameter (exact search), where position is parameter for hitters*/

app.get('/api/nfHitters/search', function(req, res, next){
	nfHitterModel.find(req.query, function(err, data){
		if(req.query.minPoints){
			var minimum = req.query.minPoints;
			delete req.query.minPoints;
			console.log(req.query);
			nfHitterModel.find({ $and: [req.query, {fanduel_fp: { $gt: minimum }}]}, function(err, data){
				res.json(data);
			});
		}else{
			res.json(data);	
		};
	});
});

/* Basketball API */

app.get('/api/basketball', function(req, res, next){
	nfBasketballModel.find({}, function(err, data){
		res.json(data);
	});
});


/* Query for any DB Parameter (exact search) */
app.get('/api/basketball/search', function(req, res, next){
	nfBasketballModel.find(req.query, function(err, data){
		res.json(data);
	});
});




var server = app.listen(process.env.PORT || 3000);