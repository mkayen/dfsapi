module.exports = HeuristicFilter;

function HeuristicFilter(){

}

HeuristicFilter.prototype.filter = function(playersByPositions, config){
    var optimizedPlayersByPositions = {},
        players = [];
    //Call filterPosition for each position
    for(var position in playersByPositions){
        players = players.concat(playersByPositions[position]);
        //console.log(position, this.getStatistics(playersByPositions[position]));
    }
    //console.log(this.getStatistics(players));
    for(var position in playersByPositions){
        optimizedPlayersByPositions[position] = playersByPositions[position].slice(0, 8);
    }
    return optimizedPlayersByPositions;
};

HeuristicFilter.prototype.getStatistics = function(players){
    var cost = 0, score = 0, count = 0;
    players.forEach(function(player){
        cost += player.cost;
        score += player.score;
        count++;
    });
    return {
        averageCost: cost/count,
        averageScore: score/count,
        count: count
    };
};