var net = require('net');
var fs = require("fs");

var server = net.createServer(function(socket) {
  fs.readFile('teste.txt', function(err, data) {
    socket.write(data);
  });
});

server.listen(8081, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8081/');
