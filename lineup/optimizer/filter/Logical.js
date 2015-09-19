module.exports = LogicalFilter;

/**
 * Remove players that cannot be present in an optimal lineup. The basic idea is to remove from a position any player
 * that have a higher cost and a lower score than any other eligible players for that position. If
 * n players can be chosen, any player that has higher cost and lower score than n other eligible players
 * is removed.
 * @constructor
 */
function LogicalFilter(){

}

/**
 * Remove players that cannot be present in an optimal lineup.
 * @param playersByPositions An object of position=>players
 * @param config An object of position=># of players
 * @returns An object of position=>players
 */
LogicalFilter.prototype.filter = function(playersByPositions, config){
    var optimizedPlayersByPositions = {};

    for(var position in playersByPositions){
        optimizedPlayersByPositions[position] = this.filterPosition(playersByPositions[position], config[position].count);
    }
    return optimizedPlayersByPositions;
};

/**
 * Remove players that cannot be present in an optimal lineup.
 * @param players An array of players
 * @param n The number of players in the lineup for that position
 * @returns An array of players
 */
LogicalFilter.prototype.filterPosition = function(players, n){
    var orderedMinCosts = []; //Ordered cost of the n less costly players encountered while filtering
    return players.sort(function(playera, playerb) {
        //Sort players by their score. If there is a tie,
        //sort them reversely by their cost
        var diff = playerb.score - playera.score;
        if(diff === 0){
            diff = playera.cost - playerb.cost;
        }
        return diff;
    }).filter(function(player){
        //Keep in mind that due to the sorting, the current player necessarily has a lower score than any of the player
        //in the minCosts array

        //If we have encountered less than n players, add the current players to the minCosts array
        if(orderedMinCosts.length < n){
            orderedMinCosts.push(player.cost);
            orderedMinCosts.sort();
            return true;
        }
        //Remove the player if its cost is higher than the greatest cost in the orderedMinCosts array,
        //meaning the player is more expensive than n players that have a higher score
        if(player.cost >= orderedMinCosts[n-1]){
            return false;
        }
        //Remove the highest cost from the array
        orderedMinCosts.pop();
        //Add the player's cost to the array
        orderedMinCosts.push(player.cost);
        //Sort the array
        orderedMinCosts.sort();
        return true;
    });
};

