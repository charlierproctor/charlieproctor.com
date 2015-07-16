var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

// list all files in a directory: /fs_list?dir=[directory]
app.get('/fs_list', function(req, res){
	fs.readdir('app/'+req.query.dir, function(err,files){
		res.send({"files":files})
	})
})

app.get('*', function(req, res){
	res.sendFile(__dirname + './app/index.html');
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port %s', server.address().port);
});