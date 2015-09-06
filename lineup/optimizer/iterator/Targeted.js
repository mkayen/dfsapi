var SequentialIterator = require("./Sequential"),
    util = require("util");

module.exports = TargetedIterator;
util.inherits(TargetedIterator, SequentialIterator);

function TargetedIterator(playersByPosition, maxCost, config){
    SequentialIterator.apply(this, arguments);
    this._maxCost = maxCost;
}

/**
 * Call the callback function for each posible lineup
 * @param callback
 */
TargetedIterator.prototype.forEach = function(callback){
    var lineup = null;
    while(lineup = this._nextLineup(lineup)){
        if(callback(this._getPlayers(lineup), lineup)){
            return;
        }
    }
};

TargetedIterator.prototype._nextLineup = function(lineup){
    var highestMetric = null,
        highestMetricPosition = null,
        player, nextPlayer, players, metric,
        positions = this._playersByPosition.length;
    //If no lineup is provided, return the initial lineup
    if(!lineup){
        return this._initialLineup();
    }
    for(var position = 0; position < positions; position++){
        players = this._playersByPosition[position];
        if(lineup[position] === players.length-1){
            continue;
        }
        player = players[lineup[position]];
        nextPlayer = players[lineup[position]+1];
        metric = (player.score - nextPlayer.score) / (nextPlayer.cost - player.cost);
        if(highestMetric == null || metric < highestMetric){
            highestMetric = metric;
            highestMetricPosition = position;
        }
    }
    if(highestMetricPosition == null){
        return null;
    }
    lineup[highestMetricPosition]++;
    console.log(lineup);
    return lineup;
};