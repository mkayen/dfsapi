var Optimizer = require("../optimizer/Optimizer"),
    util = require("util");

module.exports = Basketball;
util.inherits(Basketball, Optimizer);

var basketballConfig = {
        pointGuard: {count: 2},
        shootingGuard: {count: 2},
        smallForward: {count: 2},
        powerForward: {count: 2},
        center: {count: 1},
    };

function Basketball(filters, Iterator){
    Optimizer.call(this, basketballConfig, filters, Iterator);
}

/**
 * Convert players data to a structure compatible with the Optimizer
 * @param playersByPosition
 */
Basketball.parseData = function(playersByPosition){
    return {
        pointGuard: playersByPosition.pointGuard,
        shootingGuard: playersByPosition.shootingGuard,
        smallForward: playersByPosition.smallForward,
        powerForward: playersByPosition.powerForward,
        center: playersByPosition.center
    };
};