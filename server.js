var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

app.get('*', function(req, res){
	res.sendfile('./app/index.html');
})

var server = app.listen(3000, function () {
  console.log('Listening on port %s', server.address().port);
});