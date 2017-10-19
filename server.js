var http = require("http").createServer(servidor);
var io = require("socket.io").listen(http);
var fs = require("fs");
var querystring = require('querystring');

var contentTypes = {
    js: 'text/javascript',
    css: 'text/css',
    scss: 'text/scss',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/png',
    wav: 'audio/wav',
    mp4: 'video/mp4'
};

var recebido;

function processPost(request, response, callback) {
    // Código boilerplate pra receber a querystring pedido HTTP,
    // convertê-la e formatá-la em uma coleção de pares chave-valor

    var queryData = "";
    if(typeof callback !== 'function') return null;

    request.on('data', function(data) {
        queryData += data;
    });

    request.on('end', function() {
        request.post = querystring.parse(queryData);
        callback();
    });
}

function servidor(req, res) {
    var contentType = 'text/html';
    var filePath = '.' + req.url;
    console.log(filePath);
    if(req.method == 'POST') {
        // Se o método do pedido for HTTP POST, processa a querystring

        processPost(req, res, function() {
            // Imprime a querystring convertida em chaves-valores
            console.log(req.post);
            // O request.post está disponível para ser usado aqui

            // Retorna a página para o cliente com o cód. HTTP 200 (OK)
            res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            res.end();
        });
    }
    else if (filePath == './' || filePath == './index.html') filePath = './index.html';
    else contentType = contentTypes[req.url.split('.').pop()];
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('404.html', function(error, content) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(content, 'UTF-8');
                });
            } else {
                res.writeHead(500);
                res.end('Ooops... houve um erro interno: ' + error.code + ' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.end(content, 'UTF-8');
        }
    });
}


// http.get('/teste.txt', function(req, res) {
//     res.charset = 'UTF-8'
//     res.send(recebido);
// });


http.listen(5000, function() {
    var host = http.address().address;
    var port = http.address().port;
    console.log('Exemplo na URL http://%s:%s', host, port);
});
