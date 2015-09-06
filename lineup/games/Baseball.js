var Optimizer = require("../optimizer/Optimizer"),
    util = require("util");

module.exports = Baseball;
util.inherits(Baseball, Optimizer);

var baseballConfig = {
        firstBase: {count: 1},
        secondBase: {count: 1},
        thirdBase: {count: 1},
        shortStop: {count: 1},
        catcher: {count: 1},
        pitcher: {count: 1},
        outField: {count: 3}
    };

function Baseball(filters, Iterator){
    Optimizer.call(this, baseballConfig, filters, Iterator);
}

/**
 * Convert players data to a structure compatible with the Optimizer
 * @param playersByPosition
 */
Baseball.parseData = function(playersByPosition){
    return {
        firstBase: playersByPosition.firstBase,
        secondBase: playersByPosition.secondBase,
        thirdBase: playersByPosition.thirdBase,
        shortStop: playersByPosition.shortStop,
        catcher: playersByPosition.catcher,
        pitcher: playersByPosition.pitcher,
        outField : [].concat(playersByPosition.leftField, playersByPosition.rightField, playersByPosition.centerField)
    };
};