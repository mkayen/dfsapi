var Iterator = require("./iterator/Sequential"),
    Filter = require("./Filter"),
    Tracker = require("./Tracker");

module.exports = Optimizer;

/**
 * The Optimizer class finds the best lineup of players while respecting certain constraints. It is
 * configurable to adapt to the rules of different games.
 *
 * @param positions An array of position names (ie "firstBase", "receiver" etc..)
 * @constructor
 */
function Optimizer(positions){
    var $this = this;
    this._positionsCount = {};
    this._positions = positions;
    //Initialize the _positionsCount property to 1 player per position
    this._positions.forEach(function(position){
        $this._positionsCount[position] = 1;
    });
}

/**
 * Set the number of players in the lineup for a given position
 * @param position The name of the position
 * @param count The number of players in the lineup for that position
 */
Optimizer.prototype.setPositionCount = function(position, count){
    //Validate that the position exists
    if(this._positions.indexOf(position) < 0){
        throw new Error("Unknown position: " + position);
    }
    this._positionsCount[position] = count;
    return this;
};

/**
 * Get the best lineup under the provided cost
 * @param playersByPosition An object of position=>players
 * @param maxCost
 */
Optimizer.prototype.getLineup = function(playersByPosition, maxCost){
    var iterator, tracker;
    //Validate the structure of the playersByPosition input
    playersByPosition = this.validateInput(playersByPosition);
    //Filter out players that are guaranteed to be missing in the optimal lineup
    //See the Filter class for more details
    playersByPosition = Filter.filter(playersByPosition, this._positionsCount);

    //Instantitate the tracker and iterator
    iterator = new Iterator(playersByPosition, this._positionsCount);
    tracker = new Tracker(playersByPosition, this._positionsCount, maxCost);
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
    this._positions.forEach(function(position){
        if(!(playersByPosition[position] instanceof Array)){
            throw new Error("Missing position " + position + " in players data.");
        }else if(playersByPosition[position].length < 1){
            throw new Error("You need at least one eligible player for the position " + position + ".");
        }
    });
    return playersByPosition;
};



