var request = require("request");
var json = require("json");
var q = require('q');
var axios = require('axios');
var fs = require('fs')

// 1B
var firstBasePromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=1B')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// 2B
var secondBasePromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=2B')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// SS
var shortStopPromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=SS')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// 3B
var thirdBasePromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=3B')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// C
var catcherPromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=C')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// P

var pitcherPromise =
axios.get('http://dfs1.herokuapp.com/api/nfPitchers/search?minPoints=9')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// LF
var leftFieldPromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=LF')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// CF
var centerFieldPromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=CF')
	.then(function(response){
		// console.log(response)
		return response.data
	})

// RF
var rightFieldPromise = 
axios.get('http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=RF')
	.then(function(response){
		// console.log(response)
		return response.data
	})

q.all([firstBasePromise, secondBasePromise, shortStopPromise, thirdBasePromise, catcherPromise, pitcherPromise, leftFieldPromise, centerFieldPromise, rightFieldPromise])
	.spread(function(firstBaseArray, secondBaseArray, shortStopArray, thirdBaseArray, catcherArray, pitcherArray, leftFieldArray, centerFieldArray, rightFieldArray){

		// Create Outfield Array (Merges the three arrays)

		var outFieldArray = leftFieldArray.concat(centerFieldArray, rightFieldArray)

		// OutfieldTrio Array
		
		var outFieldTrioArray = [];
		var outFieldLength = outFieldArray.length;
		for(var i = 0; i < outFieldLength; i++){
			var j = i + 1;
			for(var j; j < outFieldLength; j++){
				var k = j + 1;
				for(var k; k < outFieldLength; k++){
					var outFieldTrio = [];
					outFieldTrio.push(outFieldArray[i].name);
					outFieldTrio.push(outFieldArray[j].name);
					outFieldTrio.push(outFieldArray[k].name);
					outFieldTrio.push(outFieldArray[i].fanduel_fp + outFieldArray[j].fanduel_fp + outFieldArray[k].fanduel_fp);
					outFieldTrio.push(outFieldArray[i].fanduel_salary + outFieldArray[j].fanduel_salary + outFieldArray[k].fanduel_salary);
					outFieldTrioArray.push(outFieldTrio);
				}
			}
		}

		// Lengths of Each Option

		var pitcherLength = pitcherArray.length;
		var catcherLength = catcherArray.length;
		var firstBaseLength = firstBaseArray.length;
		var secondBaseLength = secondBaseArray.length;
		var thirdBaseLength = thirdBaseArray.length;
		var shortStopLength = shortStopArray.length;
		var outFieldTrioLength = outFieldTrioArray.length;

		var positionPairs = function(array1, array2, resultArray){
			var array1len = array1.length;
			var array2len = array2.length;
			for(var i = 0; i < array1len; i++){
				for(var j = 0; j < array2len; j++){
					var pair = [];
					pair.push(array1[i].name)
					pair.push(array2[j].name)
					pair.push(array1[i].fanduel_fp + array2[j].fanduel_fp)
					pair.push(array1[i].fanduel_salary + array2[j].fanduel_salary)
					resultArray.push(pair)
				}
			}
		}

		// Pairs of Positions

		var pitcherCatcher = [];
		var firstSecond = [];
		var thirdShort = [];

		positionPairs(pitcherArray, catcherArray, pitcherCatcher);
		positionPairs(firstBaseArray, secondBaseArray, firstSecond);
		positionPairs(thirdBaseArray, shortStopArray, thirdShort);

		// Quads (5 & 4) of each position

		var pitcherCatcherFirstSecond = [];
		var pitcherCatcherLen = pitcherCatcher.length;
		var firstSecondLen = firstSecond.length;
		for(var i = 0; i < pitcherCatcherLen; i++){
			for(var j = 0; j < firstSecondLen; j++){
				var quad = []
				quad.push(pitcherCatcher[i][0])
				quad.push(pitcherCatcher[i][1])
				quad.push(firstSecond[j][0])
				quad.push(firstSecond[j][1])
				quad.push(pitcherCatcher[i][2] + firstSecond[j][2])
				quad.push(pitcherCatcher[i][3] + firstSecond[j][3])
				pitcherCatcherFirstSecond.push(quad)
			}
		}

		var pitcherCatcherFirstSecondLen = pitcherCatcherFirstSecond.length;

		var thirdShortOF = [];
		var thirdShortLen = thirdShort.length;
		for(var i = 0; i < thirdShortLen; i++){
			for(var j = 0; j < outFieldTrioLength; j++){
				var quad = []
				quad.push(thirdShort[i][0])
				quad.push(thirdShort[i][1])
				quad.push(outFieldTrioArray[j][0])
				quad.push(outFieldTrioArray[j][1])
				quad.push(outFieldTrioArray[j][2])
				quad.push(thirdShort[i][2] + outFieldTrioArray[j][3])
				quad.push(thirdShort[i][3] + outFieldTrioArray[j][4])
				thirdShortOF.push(quad)
			}
		}

		var thirdShortOFLen = thirdShortOF.length;

		// Generate the Ultimate Lineup

		var ultimateLineup = [];
		for(var i = 0; i < pitcherCatcherFirstSecondLen; i++){
			for(var j = 0; j < thirdShortOFLen; j++){
				var lineup = []
				lineup.push(pitcherCatcherFirstSecond[i][0])
				lineup.push(pitcherCatcherFirstSecond[i][1])
				lineup.push(pitcherCatcherFirstSecond[i][2])
				lineup.push(pitcherCatcherFirstSecond[i][3])
				lineup.push(thirdShortOF[j][0])
				lineup.push(thirdShortOF[j][1])
				lineup.push(thirdShortOF[j][2])
				lineup.push(thirdShortOF[j][3])
				lineup.push(thirdShortOF[j][4])
				lineup.push(pitcherCatcherFirstSecond[i][4] + thirdShortOF[j][5])
				lineup.push(pitcherCatcherFirstSecond[i][5] + thirdShortOF[j][6])
				if(ultimateLineup.length > 0){
					if(lineup[9] > ultimateLineup[0][9] && lineup[10] < 35000){
						ultimateLineup = []
						ultimateLineup.push(lineup)
					}
				}else{
					ultimateLineup.push(lineup)
				}

			}
		}

		// Logs

		// console.log('P: ' + pitcherLength)
		// console.log('C: ' + catcherLength)
		// console.log('1B: ' + firstBaseLength)
		// console.log('2B: ' + secondBaseLength)
		// console.log('3B: ' + thirdBaseLength)
		// console.log('SS: ' + shortStopLength)
		// console.log('OF: ' + outFieldLength)
		// console.log('OF3: ' + outFieldTrioLength)
		// console.log('Possible Lineups:' + (pitcherLength * catcherLength * firstBaseLength * secondBaseLength * thirdBaseLength * shortStopLength * outFieldTrioLength))
		// console.log('Pitcher Catcher Pairs: ' + pitcherCatcher.length)
		// console.log('First Second Base Pairs: ' + firstSecond.length)
		// console.log('Third Short Pairs: ' + thirdShort.length)
		// console.log('Possible Lineups via Pairs: ' + pitcherCatcherFirstSecondLen * thirdShortOFLen)
		// console.log('First x Second x Pitch x Catch: ' + pitcherCatcherFirstSecondLen)
		// console.log('Third x Short x Outfield: ' + thirdShortOF.length)

		// Garbage Collection

		pitcherArray = null;
		catcherArray = null;
		firstBaseArray = null;
		secondBaseArray = null;
		thirdBaseArray = null;
		shortStopArray = null;
		outFieldArray = null;
		outFieldTrioArray = null;
		pitcherCatcher = null;
		firstSecond = null;
		thirdShort = null;

		// More Logs

		fs.writeFile('./cache/optLineup.json', ultimateLineup)
		console.log(ultimateLineup)


		// console.log(pitcherArray)

	}).catch(function(e) {
		console.warn(e)
	});


