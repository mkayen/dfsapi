 /* Swish Analytics Crawler - MLB Hitters */

'use strict';
var cheerio = require("cheerio");
var request = require("request");
var json = require("json");
var fs = require('fs');
var path = require('path')

request('https://swishanalytics.com/optimus/mlb/dfs-batter-projections',
	function(error, response, html){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(html)
			var variable = $('script')[19].children[0].data
			var data = variable.substring(variable.indexOf("= ")+2, variable.indexOf(";"))
			console.log(data)
			// var filePath = path.join(__dirname, "cache/swishHitters.json")
			// fs.writeFile(filePath, data)
		}
	})