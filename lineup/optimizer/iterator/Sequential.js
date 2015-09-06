module.exports = SequentialIterator;

/**
 * Iterate over all the lineups sequentially.
 *
 * @param playersByPosition An object of position=>players
 * @param config An object of position=># of players
 * @constructor
 */
function SequentialIterator(playersByPosition, maxCost, config){
    this._initializePositions(playersByPosition, config);
}

/**
 * Initialize the internal representation of the players and position
 * @param playersByPosition An object of position=>players
 * @param config An object of position=># of players
 * @private
 */
SequentialIterator.prototype._initializePositions = function(playersByPosition, config){
    var $this = this;
    $this._playersByPosition = [];
    $this._positions = [];
    // Players from each position are added to the _playersByPosition array in which
    // each index corresponds to a position. If n players can play in the same position,
    // the players are added n times
    // The _positions array holds the mapping of position index to position name
    Object.getOwnPropertyNames(playersByPosition).forEach(function(position){
        for(var i = 0; i < config[position].count; i++){
            $this._playersByPosition.push(playersByPosition[position]);
            $this._positions.push(position);
        }
    });
};

/**
 * Call the callback function for each possible lineup
 * @param callback
 */
SequentialIterator.prototype.forEach = function(callback){
    var lineup = null;
    while(lineup = this._nextLineup(lineup)){
        callback(this._getPlayers(lineup), lineup);
    }
};

/**
 * Converts the provided lineup to an array of players
 * @param lineup An array of index for each position
 * @private
 */
SequentialIterator.prototype._getPlayers = function(lineup){
    var $this = this;
    return lineup.map(function(column, position){
        return $this._playersByPosition[position][column]
    });
};

/**
 * Create a lineup corresponding to the first player for each position ([0, 0, 0 ...])
 * @return An array of index for each position
 * @private
 */
SequentialIterator.prototype._initialLineup = function(){
    return this._positions.map(function(){
        return 0;
    });
};

/**
 * Compute the lineup that follows the provided lineup or null if there are no more possible lineups.
 * The next lineup is computed by incrementing the position's index from the first position until a valid
 * line up is found.
 * @param lineup An array of index for each position
 * @return An array of index for each position
 * @private
 */
SequentialIterator.prototype._nextLineup = function(lineup){
    var position = 0, positions = this._playersByPosition.length;
    //If no lineup is provided, return the initial lineup
    if(!lineup){
        return this._initialLineup();
    }
    //Starting from the first position, increment the current position's index.
    while(position < positions){
        //Increment the position's index in the lineup
        lineup[position]++;
        //If the position's index is less than the number of player for that position, return the updated lineup
        if(lineup[position] < this._playersByPosition[position].length){
            return lineup;
        }
        //Reset the position's index and move on to the following position
        lineup[position] = 0;
        position++;
    }
    return null;
};

