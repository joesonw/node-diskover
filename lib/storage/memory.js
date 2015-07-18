
module.exports = Memory;
var proto = Memory.prototype;

function Memory(opts) {
	if (!(this instanceof Memory)) return new Memory(opts);
	this._refs = {};
}

proto.get = function* get(id) {
	return this._refs[id];
};

proto.save = function* save(id,item) {
	this._refs[id] = item;
};

proto.del = function* del(id) {
	if (this._refs[id]) {
		delete this._refs[id];
	}
};

proto.rdel = function* rdel(id,idRef,recursiveRef) {
	var item = yield this.get(id);
	for (var i of item[recursiveRef]) {
		yield this.rdel(i[idRef],idRef,recursiveRef);
	}
	yield this.del(id);
}

proto.print = function() {
	console.log(this._refs);
}