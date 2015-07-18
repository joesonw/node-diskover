module.exports = Node;

var proto = Node.prototype;
function Node(opts) {
	if (!(this instanceof Node)) return new Node(opts);
	this._children 	= opts.chidlren || [];
	this._data 		= opts.data || {};
	this._path		= opts.path || '';
	this._acl 		= opts.acl  || [];
	var paths 		= this._path.split('/')
	this._name 		= paths[paths.length-1];
}

proto.push = function push(node) {
	this.remove(node);
	this._children.push({
		_name:node._name,
		_path:node._path
	});
}

proto.remove = function remove(node) {
	for (var i=0;i<this._children.length;i++) {
		if (this._children[i]._name === node._name) {
			this._children.splice(i,1);
			break;
		}
	}
}

proto.toJSON = function toJSON() {
	var children = [];
	for (var c of this._children) {
		children.push({
			name:c._name,
			path:c._path
		})
	}
	return {
		children:children,
		name:this._name,
		path:this._path,
		data:this._data
	}
};