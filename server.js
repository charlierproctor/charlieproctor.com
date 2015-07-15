var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

// all the photos in the app/img/photos directory
app.get('/photo_list', function(req, res){
	fs.readdir('app/img/photos/min', function(err,files){
		res.send({"images":files})
	})
})

app.get('*', function(req, res){
	res.sendFile('./app/index.html');
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port %s', server.address().port);
});