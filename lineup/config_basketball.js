var path = require("path");

module.exports = {
    cache: path.join(__dirname, "resources/cacheTest.json"),
    urls: {
        pointGuard: 'http://dfs1.herokuapp.com/api/basketball/search?depth_position=PG',
        shootingGuard: 'http://dfs1.herokuapp.com/api/basketball/search?depth_position=SG',
        smallForward: 'http://dfs1.herokuapp.com/api/basketball/search?depth_position=SF',
        powerForward: 'http://dfs1.herokuapp.com/api/basketball/search?depth_position=PF',
        center: 'http://dfs1.herokuapp.com/api/basketball/search?depth_position=C'
    }
};
