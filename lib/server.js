var koa = require('koa');
var Memory = require('./storage/memory');
var bodyparser 	= require('koa-bodyparser');


function Server(opts) {
	if (!(this instanceof Server)) return new Server(opts);
	this._server 	= koa();
	this._nodes 	= Memory();
	this._users 	= Memory();
	this._groups 	= Memory();
	this._op 		= [
		'memory'
	];
	this._init();
}

proto = Server.prototype;

proto.listen = function listen() {
	return this._server.listen.apply(this._server,arguments);
};

proto.use = function use(key,val) {
	if (this._op.indexOf(key) !== -1) {
		this['_'+key] = val;
	}
};

var routes_nodes = require('./routes/nodes');

proto._init = function _init() {
	var self = this;
	this._server.use(bodyparser());
	this._server.use(function* (next) {
		this.type = 'json';
		var method 	= String(this.request.method).toUpperCase();
		var url 	= String(this.url);
		var path	= url.split('?')[0].split('/').slice(1);
		var query	= this.query;
		var body	= this.request.body;
		if (path[0] === 'nodes') {
			yield routes_nodes(this,self,method,path.slice(1),query,body);
		}
		yield next;
	});
};





module.exports = Server;