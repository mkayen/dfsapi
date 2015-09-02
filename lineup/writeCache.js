var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    async = require('async'),
    config = require('./config');

var outputDir = path.join(__dirname, config.cachePath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
var start = Date.now();
async.each(Object.getOwnPropertyNames(config.urls), function(position, next){
    var file = fs.createWriteStream(path.join(outputDir, position + ".json"));
    http.get(config.urls[position], function(response) {
        response.pipe(file);
        response.on("end", function(){
            console.log("Finished downloading " + position + ".json in " + (Date.now() - start) + "ms");
            next();
        });
    });
}, function(){
    console.log("Finished downloading json files in " + (Date.now() - start) + "ms")
});

