var config = require("./config");

var rawData = require("./resources/readCache");

var multiTaskers = [["rightField","leftField", "centerField"]];

var data = Object.getOwnPropertyNames(rawData).map(function(position){
    return parse(data[position]);
});

var prevPlayerCost = null;
return players;

var mod = 10000000,
    combinations = 1,
    itemCount = 0,
    maxCost = 25000,
    time = Date.now(),
    bestScore = 0,
    bestIndex;

simpleData.forEach(function(players) {
    combinations *= players.length
});

var totalCost, totalScore;
forEach(simpleData, function(index){
    itemCount++;
    if(itemCount % mod === 0){
        console.log(
            "It took " + (Date.now() - time) + "ms to process " + Math.round(itemCount/1000000) + "M/" + Math.round(combinations/1000000) + "M (" + (Math.round((itemCount / combinations)*100*100)/100) + "%)",
            "Remaining time " + Math.round(((Date.now() - time) * ((combinations - itemCount)/ mod)) / 1000) + "s"
        );
        time = Date.now();
    }
    totalCost = 0;
    totalScore = 0;
    for (var i = 0; i < simpleData.length; i++){
        var player = simpleData[i][index[i]];
        totalCost += player.cost;
        if(totalCost > maxCost){
            return;
        }
        totalScore += player.score;
    }
    if(totalScore > bestScore){
        bestScore = totalScore;
        bestIndex = index.slice(0);
        console.log("New best ", bestScore, totalCost, bestIndex);
    }
});

var lineup = [];
for (var i = 0; i < simpleData.length; i++){
    lineup.push(simpleData[i][bestIndex[i]]);

}
console.log("Best : ", bestScore, lineup);

console.log(
    "It took " + (Date.now() - time) + "ms to process " + Math.round(itemCount/1000000) + "M/" + Math.round(combinations/1000000) + "M (" + (Math.round((itemCount / combinations)*100*100)/100) + "%)",
    "Remaining time " + Math.round(((Date.now() - time) * ((combinations - itemCount)/ mod)) / 1000) + "s"
);

function parse(players){
    return players.filter(function(player){
        return player.fanduel_fp && player.fanduel_salary;
    }).map(function(player){
        return {
            name: player.name,
            id: player.id,
            score: player.fanduel_fp,
            cost: player.fanduel_salary
        }
    });
}

function forEach(data, callback){
    var index = null;
    while(index = nextIndex(index, data)){
        callback(index);
    }
}

function nextIndex(index, data){
    if(!index){
        return data.length == 0 ? null: data.map(function() {return 0});
    }
    var i = 0, columns = data.length;
    while(!incrementIndexColumn(index, i, data[i].length)){
        i++;
        if(i == columns){
            return null;
        }
    }
    return index;
}

function incrementIndexColumn(index, column, length){
    index[column]++;
    if(index[column] == length){
        index[column] = 0;
        return false;
    }
    return true;
}