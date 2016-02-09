var express = require('express');
var app = express();
var port = process.env.PORT || 4569;

app.use(express.static(__dirname + '/public'));
app.listen(port);
/*
// probably don't need this...
app.get("/",function(req,res){
  res.send('test');
  // res.render(index);
});
*/
/*
// crazy simple node server
var http = require('http');
var port = process.env.PORT || 4569;
//process.env.PORT, process.env.IP
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('hello mks mvp!\n');
}).listen(port);

console.log('server running on : ', port);
*/