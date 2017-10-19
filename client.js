var http = require('http');
var fs = require("fs");

var port = 8082;

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
    fs.readFile('teste.txt', function(err, data) {
      s.write("\n",data);
    });
    // console.log(response);
    response.end(body);

  });
});

s.listen(port);

// http.createServer((request, response) => {
//   request.on('error', (err) => {
//     console.error(err);
//     response.statusCode = 400;
//     response.end();
//   });
//   response.on('error', (err) => {
//     console.error(err);
//   });
//   if (request.method === 'GET' && request.url === '/echo') {
//     body = Buffer.concat(body).toString();
//     response.end(body);
//   } else {
//     response.statusCode = 404;
//     response.end();
//   }
// }).listen(8081);
console.log('Browse to http://127.0.0.1:' + port);
