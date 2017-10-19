var http = require('http')
var fs = require("fs");


var server = http.createServer();
server.on('request', function(request, response) {
  console.log(JSON.stringify(request.headers));

  fs.readFile('teste.txt', function(err, data) {
    socket.write(data);
  });
});

server.listen(8081, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8081/');
