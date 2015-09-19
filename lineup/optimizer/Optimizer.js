var Tracker = require("./Tracker");

module.exports = Optimizer;

/**
 * The Optimizer class finds the best lineup of players while respecting certain constraints. It is
 * configurable to adapt to the rules of different games.
 *
 * @param config An array of position names (ie "firstBase", "receiver" etc..)
 * @constructor
 */
function Optimizer(config, filters, Iterator){
    this._config = config;
    this._filters = filters;
    this._Iterator = Iterator;
}

Optimizer.prototype.setFilters = function(filters){
    this._filters = filters;
    return this;
};

Optimizer.prototype.setIterator = function(Iterator){
    this._Iterator = Iterator;
    return this;
};

/**
 * Get the best lineup under the provided cost
 * @param playersByPosition An object of position=>players
 * @param maxCost
 */
Optimizer.prototype.getLineup = function(playersByPosition, maxCost){
    var iterator, tracker;
    for(var i = 0; i < this._filters.length; i++){
        playersByPosition = this._filters[i](playersByPosition, this._config);
    }
    //Validate the structure of the playersByPosition input
    playersByPosition = this.validateInput(playersByPosition);
    //Instantitate the tracker and iterator
    iterator = new this._Iterator(playersByPosition, maxCost, this._config);
    tracker = new Tracker(playersByPosition, this._config, maxCost);
    //Iterate over the possible lineups and pass them to the tracker's track function
    iterator.forEach(tracker.record.bind(tracker));
    //Return the result recorded by the tracker
    return tracker.getResult();
};


/**
 * Validates that all the positions defined for this game are present within
 * the input
 * @param playersByPosition An object of position=>players
 */
Optimizer.prototype.validateInput = function(playersByPosition){
    Object.getOwnPropertyNames(this._config).forEach(function(position){
        if(!(playersByPosition[position] instanceof Array)){
            throw new Error("Missing position " + position + " in players data.");
        }else if(playersByPosition[position].length < 1){
            throw new Error("You need at least one eligible player for the position " + position + ".");
        }
    });
    return playersByPosition;
};



