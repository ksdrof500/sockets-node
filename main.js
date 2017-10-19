// var http = require('http')
// var fs = require("fs");
//
//
// var server = http.createServer();
// server.on('request', function(request, response) {
//   console.log(JSON.stringify(request.headers));
//
//   fs.readFile('teste.txt', function(err, data) {
//     socket.write(data);
//   });
// });
//
// server.listen(8081, '127.0.0.1');
//
// console.log('Server running at http://127.0.0.1:8081/');

var net = require('net');
var fs = require("fs");
var http = require('http')

var server = net.createServer(function(socket) {
  console.log(socket);
  fs.readFile('teste.txt', function(err, data) {
    socket.write("\n",data);
  });

  var s = http.createServer();
  s.on('request', function(request, response) {
    response.writeHead(200);
    // const userAgent = headers['user-agent'];
    const {
      headers,
      method,
      url
    } = request;
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(response.statusCode);
      console.log(request.method);
      console.log(request.url);
      // console.log(response);
      response.end(body);

    });
  });
});

server.listen(8081, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8081/');
