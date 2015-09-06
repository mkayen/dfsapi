var RemoteStore = require("./store/Remote"),
    CacheStore = require("./store/Cache"),
    Baseball = require("./games/Baseball");

//Instantiate stores and optimizer
var config = require("./config"),
    remote = new RemoteStore(config.urls),
    cache = new CacheStore(config.cache, remote);

//Fetch the player's data from the cache
cache.getData().then(function(players) {
    //Compute the best lineup
    Baseball.getLineup(Baseball.parseData(players), 35000);
    console.log(res);
}).catch(function(err){
    console.error(err.stack)
});
