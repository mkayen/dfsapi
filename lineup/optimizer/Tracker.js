module.exports = Tracker;

/**
 * The Tracker tracks lineup statistics.
 *
 * @param playersByPosition An object of position=>players
 * @param config An object of position=># of players
 * @param maxCost The maximum cost for the best lineup
 * @constructor
 */
function Tracker(playersByPosition, config, maxCost){
    var $this = this;
    this.maxCost = maxCost;
    this.best = null;
    this.count = 0;
    this.percentage = 0;
    this.combinations = 1;
    this.progressWindow = 1;
    this.silent = true;
    this._playersByPosition = playersByPosition;
    this._config = config;
    //Computes the number of combinations for the given players
    Object.getOwnPropertyNames(playersByPosition).forEach(function(position){
        for(var i = 0; i < config[position].count; i++){
            $this.combinations *= playersByPosition[position].length;
        }
    });
}

/**
 * Return the best lineup and the number of iterations performed so far
 * @returns {{best: *, count: *}}
 */
Tracker.prototype.getResult = function(){
    return {
        best: this.best,
        config: this._config,
        playersByPosition: this._playersByPosition,
        count: this.count
    };
};

/**
 * Check a lineup's validatity and record it in the tracker's results.
 * @param players The players in the lineup
 * @returns {boolean} True if the record is valid
 */
Tracker.prototype.record = function(players, lineup){
    this.count++;

    var cost = 0, score = 0, ids, id;
    //Compute the lineup's score and cost
    for(var i = 0; i < players.length; i++){
        cost += players[i].cost;
        score += players[i].score;
        //Return false if the lineup is above the defined cost
        if(cost > this.maxCost){
            return false;
        }
    }
    //Check if we made progress, output a message if we did
    if(!this.silent && this.percentage != Math.round((this.count / this.combinations) * 100 / this.progressWindow)){
        this.percentage = Math.round((this.count / this.combinations) * 100 / this.progressWindow);
        console.log("[Tracker - " + new Date() + "] " +  this.count + "/" + this.combinations + " (" + (this.percentage*this.progressWindow) + "%) covered", score);
    }

    //Return false if the lineup' score is below the best lineup' score encountered so far
    if(this.best != null && (score < this.best.score || (score === this.best.score && cost > this.best.cost))){
        return false;
    }

    //Check that there are not duplicate ids in the lineup
    ids = {};
    for(var i = 0; i < players.length; i++){
        id = players[i].id;
        if(ids[id] === true){
            return false;
        }
        ids[id] = true;
    }
    //Record the lineup as the best so far
    this.best = {
        players: players,
        lineup: lineup.slice(0),
        score: score,
        cost: cost
    };
    return true;
};