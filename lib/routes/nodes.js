var Node = require('../node');
module.exports = function* (koa,server,method,nodes,query,body) {
	var path = nodes.join('/');
	if (method === 'GET') {
		var node  = yield server._nodes.get(path);
		if (!node) {
			koa.status = 404;
			koa.body = "{error:\"Node " + path + " not found\"}";
			return;
		}	
		koa.status = 200;
		koa.body = JSON.stringify(node.toJSON());
	} else if (method === 'PUT') {
		var node = new Node({
			path:path
		});
		var stack = [];
		var cursor;
		for (var i=0;i<nodes.length-1;i++) {
			var n = nodes[i];
			stack.push(n);
			var currentPath = stack.join('/');
			var result = yield server._nodes.get(currentPath);
			if (!result) { //mkdir -p
				result = new Node({
					path:currentPath
				});
			}
			yield server._nodes.save(result._path,result);
			if (cursor) {
				cursor.push(result);
				yield server._nodes.save(cursor._path,cursor);
			}
			cursor = result;
		}
		if (cursor) {
			cursor.push(node);
			yield server._nodes.save(cursor._path,cursor);
		}
		if (body) {
			node._data = body;
		}
		yield server._nodes.save(node._path,node);
		koa.status = 200;
		koa.body = JSON.stringify(node.toJSON());
	} else if (method === 'DELETE') {
		var node  = yield server._nodes.get(path);
		if (!node) {
			koa.status = 404;
			koa.body = "{error:\"Node " + path + " not found\"}";
			return;
		}	
		yield server._nodes.rdel(node._path,'_path','_children');
		if (nodes.length > 1) {
			var parent = yield server._nodes.get(nodes.slice(0,-1).join('/'));
			parent.remove(node);
			yield server._nodes.save(parent._path,parent);
		}
		koa.status = 200;
		koa.body = "";
	}
};

