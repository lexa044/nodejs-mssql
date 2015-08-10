var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var protectJSON = require('./lib/protectJSON');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(protectJSON);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
}); 

app.use('/', require('./routes'));
// If no route is matched, it must be 404
app.use(function(req, res, next){
  res.status(404).end();  
});

var port = (process.env.PORT || 5555);
server.listen(port);
console.log('listening on: ' + port);
