var Server = require('./lib/server');

server = Server();

server.listen(8080);
console.log('listening on 8080');