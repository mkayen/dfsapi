var Optimizer = require("./../optimizer/Optimizer");

var Baseball = module.exports = {};

/**
 * Compute the best lineup with provided players and under the provided cost
 * @param playersByPositions An object of position=>players
 * @param cost The maximum cost for the lineup
 * @returns {*} The best lineup
 */
Baseball.getLineup = function(playersByPositions, cost){
    return new Optimizer(["firstBase", "secondBase", "thirdBase", "shortStop", "catcher", "pitcher", "outField"])
        .setPositionCount("outField", 3)
        .getLineup(playersByPositions, cost);
};

/**
 * Convert players data to a structure compatible with the Optimizer
 * @param playersByPositions
 */
Baseball.parseData = function(playersByPositions){
    return {
        firstBase: playersByPositions.firstBase,
        secondBase: playersByPositions.secondBase,
        thirdBase: playersByPositions.thirdBase,
        shortStop: playersByPositions.shortStop,
        catcher: playersByPositions.catcher,
        pitcher: playersByPositions.pitcher,
        outField : [].concat(playersByPositions.leftField, playersByPositions.rightField, playersByPositions.centerField)
    };
};