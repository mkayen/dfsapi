var Q = require('q');

var basketballCrawl = require('../crawlers/nfBasketball');
var basketballSeed = require('./seedBasketball');

var seed = function(){
	basketballCrawl()
	.then(basketballSeed())
}