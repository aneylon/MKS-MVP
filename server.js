// server.js
// the most basic of node servers

var http = require('http');
var port = process.env.PORT || 4569;
//process.env.PORT, process.env.IP
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('hello world\n');
}).listen(port);

console.log('server running on : ', port);