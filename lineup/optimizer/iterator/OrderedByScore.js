var Tree = require("./structures/Tree"),
    util = require("util");

module.exports = OrderedByScoreIterator;

function OrderedByScoreIterator(playersByPosition, maxCost, positionsCount){
    this._initializePositions(playersByPosition, positionsCount);
}

OrderedByScoreIterator.prototype._initializePositions = function(playersByPosition, positionsCount){
    var $this = this;
    this._playersByPosition = [];
    this._positions = [];
    Object.getOwnPropertyNames(playersByPosition).forEach(function(position){
        for(var i = 0; i < positionsCount[position]; i++){
            $this._playersByPosition.push(playersByPosition[position]);
            $this._positions.push(position);
        }
    });
};

OrderedByScoreIterator.prototype.forEach = function(callback){
    var root = new LineupTreeValue(this._playersByPosition, this._playersByPosition.map(function(){
            return 0;
        }), this._playersByPosition.reduce(function(total, players){
            return total + players[0].score;
        }, 0), 0),
        tree = new Tree(root),
        node, lineup;
    
    while(tree.size() > 0){
        node = tree.highest();

        tree.remove(node.getValue());
        lineup = node.getValue().next();

        if(!node.getValue().isComplete()){
            tree.insert(node.getValue());
        }
        if(!lineup.isComplete()) {
            if (!tree.insert(lineup)) {
                continue;
            }
        }
        if(callback(this._populateLineup(lineup.getLineup()), lineup.getLineup(), tree)){
            return;
        }
    }
};

OrderedByScoreIterator.prototype._populateLineup = function(state){
    var $this = this;
    return state.map(function(column, position){
        return $this._playersByPosition[position][column]
    });
};


function LineupTreeValue(playersByPosition, lineup, score, depth){
    this._score = score;
    this._playersByPosition = playersByPosition;
    this._lineup = lineup;
    this._depth = depth;
    this._lineups = playersByPosition.map(function(players, position){
        if(lineup[position]+1 >= players.length){
            return null;
        }
        return {
            index: position,
            score: Math.round((score - players[lineup[position]].score + players[lineup[position]+1].score) * 100)/100
        }
    }).filter(function(children){
        return children !== null;
    }).sort(function(positiona, positionb){
        return positionb.score - positiona.score;
    });
    this.update();
}

LineupTreeValue.prototype.update = function(){
    if(this._lineups.length == 0){
        this._isComplete = true;
        this._bestChildScore = null;
    }else{
        this._isComplete = false;
        this._bestChildScore = this._lineups[0].score;
    }
};

LineupTreeValue.prototype.next = function (){
    var childInfo = this._lineups.shift(),
        childState = this._lineup.slice(0),
        childNode;

    this.update();
    childState[childInfo.index]++;
    childNode = new LineupTreeValue(this._playersByPosition, childState, childInfo.score, this._depth+1);
    return childNode;
};

LineupTreeValue.prototype.compare = function(lineup){
    var diff = this.getBestChildScore() - lineup.getBestChildScore();
    if(diff !== 0){
        return diff;
    }
    diff = lineup.getDepth() -  this.getDepth();
    if(diff !== 0){
        return diff;
    }
    for(var i = 0; i < this.getLineup().length; i++){
        diff = this.getLineup()[i] - lineup.getLineup()[i];
        if(diff !== 0){
            return diff;
        }
    }
    return 0;
};

LineupTreeValue.prototype.getDepth = function(){
    return this._depth;
};

LineupTreeValue.prototype.getBestChildScore = function(){
    return this._bestChildScore;
};

LineupTreeValue.prototype.getScore = function(){
    return this._score;
};

LineupTreeValue.prototype.getLineup = function(){
    return this._lineup;
};

LineupTreeValue.prototype.isComplete = function(){
    return this._isComplete;
};



