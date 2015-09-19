var axios = require('axios');

module.exports = Remote;

function Remote(urls){
    this._urls = urls;
}

Remote.prototype.getData = function(){
    var $this = this,
        positions = Object.getOwnPropertyNames(this._urls);

    return Promise.all(positions.map(function(position){
        return axios.get($this._urls[position])
            .then(function(response){
                return response.data.filter(function(player){
                    return player.fanduel_fp && player.fanduel_salary;
                }).map(function(player){
                    return {
                        name: player.name,
                        id: player.id,
                        score: player.fanduel_fp,
                        cost: player.fanduel_salary
                    }
                });
            });
    })).then(function(results){
        var result = {};
        positions.forEach(function(position, i){
            result[position] = results[i];
        });
        return result;
    });
};