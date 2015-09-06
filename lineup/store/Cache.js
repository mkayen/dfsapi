var fs = require('fs');

module.exports = Cache;

function Cache(path, remote){
    this._path = path;
    this._remote = remote;
    this._isPresent = fs.existsSync(this._path);
}

Cache.prototype.isPresent = function(){
    return this._isPresent;
};

Cache.prototype.getData = function(refresh){
    if(refresh == true || !this.isPresent()){
        return this.fetchData();
    }else {
        return this.readData();
    }
};

Cache.prototype.readData = function(){
    var path = this._path;
    return new Promise(function(resolve, reject){
        fs.readFile(path, "UTF-8", function (err, data) {
            err ? reject(err) : resolve(JSON.parse(data));
        });
    });
};

Cache.prototype.fetchData = function(){
    var $this = this;
    return this._remote.getData().then(function(data){
        return $this.writeData(data);
    });
};

Cache.prototype.writeData = function(data){
    var path = this._path;
    return new Promise(function(resolve, reject){
        fs.writeFile(path, JSON.stringify(data), function (err) {
            err ? reject(err) : resolve(data);
        });
    });
};