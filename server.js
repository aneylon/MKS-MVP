// server.js
// the most basic of node servers

var http = require('http');
var port = 4569;
http.createServer(function(req,res){
  response.writeHead(200,{'Content-Type': 'text/plain'});
  response.end('hello world\n');
}).listen(port);

console.log('server running on : ', port);