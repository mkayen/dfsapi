var RemoteStore = require("./store/Remote"),
    CacheStore = require("./store/Cache"),
    Basketball = require("./games/Basketball"),
    LogicalFilter = require("./optimizer/filter/Logical"),
    HeuristicFilter = require("./optimizer/filter/Heuristic"),
    SequentialIterator = require("./optimizer/iterator/Sequential"),
    TargetedIterator = require("./optimizer/iterator/Targeted");

//Instantiate stores and optimizer
var config = require("./config_basketball"),
    remote = new RemoteStore(config.urls),
    cache = new CacheStore(config.cache, remote),
    basketball = new Basketball(),
    start = Date.now();


//Fetch the player's data from the cache
cache.getData().then(function(players) {
    //Compute the best lineup
    var logicalFilter = new LogicalFilter(),
        heuristicFilter = new HeuristicFilter(),
        filters = [
            logicalFilter.filter.bind(logicalFilter),
            heuristicFilter.filter.bind(heuristicFilter)
        ]
        ;
    var res = basketball
        .setFilters(filters)
        .setIterator(SequentialIterator)
        .getLineup(Basketball.parseData(players), 60000);

    printPlayers(res.playersByPosition, res.config, res.best.lineup);
    console.log(res.best)
    console.log("FINISHED - score: " + Math.round(res.best.score*100)/100 + ", cost: " + res.best.cost + ", iterations: " + res.count + ", time: " + (Date.now() - start) + "ms");
}).catch(function(err){
    console.error(err.stack)
});

var printf = require("printf");

function printPlayers(playersByPosition, config, lineup){
    var positions = [],
        maxLength, strValues;

    for(var position in playersByPosition){
        for(var i = 0; i < config[position].count; i++){
            positions.push(position);
        }
    }
    maxLength = positions.reduce(function(maxLength, position){
        return Math.max(maxLength, playersByPosition[position].length);
    }, 0);

    for(var line = 0; line < maxLength; line++){
        strValues = [];
        console.log(positions.map(function(position, positionIndex){
            return getPlayerString(playersByPosition[position][line], line, lineup[positionIndex] == line)
        }).join("|"));
    }
}

function getPlayerString(player, index, isSelected){
    if(!player){
        return "        N/A       ";
    }
    var out = isSelected ? " -" : printf('%2d', index);
    out += printf(':%3d:%5.2f:%2.2f ', player.cost/100, player.score, player.score*1000/player.cost);
    return out;
}
