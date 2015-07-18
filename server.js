var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

// recursively list files + directories in a directory: /fs_list?dir=[directory]
app.get('/fs_list', function(req, res){

	var walk = function(dir,cb){
		var hash = {"name":dir, "files":[], "directories":[]}
		fs.readdir(dir, function(err,files){
			var wait = files.length
			for (var i = 0; i < files.length; i++) {
				(function(filename,cb){
					fs.stat(dir + '/' + filename, function(err,stats){
						if (stats.isDirectory()){
							walk(dir + '/' + filename,function(sub){
								hash.directories.push(sub)
								if (--wait === 0){ cb(hash) }
							})
						} else {
							hash.files.push(filename)
							if (--wait === 0){ cb(hash) }
						}
					})
				})(files[i],cb)
			};
		})
	}

	walk('app/' + req.query.dir, function(hash){
		res.send(hash)
	})
})

app.get('*', function(req, res){
	res.sendFile(__dirname + '/app/index.html');
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port %s', server.address().port);
});