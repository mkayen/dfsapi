var cheerio = require("cheerio")
var request = require("request")
var fs = require('fs')
var path = require('path')

request('https://www.swishanalytics.com/optimus/optimus-x', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html)
    var variable = $('script')[8].children[0].data
   	var substr = variable.substring(variable.indexOf("this.masterPlayerArray = "))
   	var data = substr.substring(substr.indexOf("= ")+2,substr.indexOf(';'))
    fs.writeFile(path.join(__dirname + '/cache/swishBasketball.json'), data)
  }
});