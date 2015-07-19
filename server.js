var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

// recursively list files + directories in a directory: /fs_list?dir=[directory]
app.get('/fs_list', function(req, res){

	var walk = function(dir,success,error){
		var hash = {"name":dir.substring('app/'.length), "files":[], "directories":[]}
		fs.readdir(dir, function(err,files){
			if (err){
				error(err)
			} else {
				var wait = files.length
				for (var i = 0; i < files.length; i++) {
					if (files[i] == 'album.json'){
						hash.info = require('./' + dir + '/album.json')
					}
					(function(filename,success,error){
						fs.stat(dir + '/' + filename, function(err,stats){
							if (err){
								error(err)
							} else {
								if (stats.isDirectory()){
									walk(dir + '/' + filename,function(sub){
										hash.directories.push(sub)
										if (--wait === 0){ success(hash) }
									})
								} else {
									hash.files.push(filename)
									if (--wait === 0){ success(hash) }
								}
							}
						})
					})(files[i],success,error)
				};
			}
		})
	}

	walk('app/' + req.query.dir, function(hash){
		res.send(hash)
	}, function(hash){
		res.status(400).send(hash)
	})
})

app.get('*', function(req, res){
	res.sendFile(__dirname + '/app/index.html');
})

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port %s', server.address().port);
});