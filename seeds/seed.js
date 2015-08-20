/* Bulk Seed File

node crawlers/numberfire.js > cache/numberfire.json
node crawlers/numberfire_pitchers.js > cache/numberfire_pitchers.json
node seeds/numberfire.js
node seeds/numberfire_pitchers.js

*/

var mongoose = require('mongoose');
var Q = require('q');
var db = require('../db.js').db

// Crawlers

var pitcherCrawl = require('../crawlers/nfPitchersCrawler.js');
var hitterCrawl = require('../crawlers/nfHittersCrawler.js');

// Seed Files

var nfHittersSeed = require('./nfHittersSeed.js');
var nfPitchersSeed = require('./nfPitchersSeed.js');

// Seed

var seed = function(){
	pitcherCrawl()
	.then(hitterCrawl())
	.then(nfPitchersSeed)
	.then(nfHittersSeed, function(){
		console.log('Done!')
	})
}