var path = require("path");

module.exports = {
    cache: path.join(__dirname, "resources/cache.json"),
    urls: {
        firstBase: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=1B',
        secondBase: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=2B',
        thirdBase: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=3B',
        shortStop: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=SS',
        catcher: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=C',
        pitcher: 'http://dfs1.herokuapp.com/api/nfPitchers/',
        leftField: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=LF',
        centerField: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=CF',
        rightField: 'http://dfs1.herokuapp.com/api/nfHitters/search?depth_position=RF'
    }
};