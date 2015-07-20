var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

request('http://octodex.github.com', function (error, response, body) {
	var cats = []

	$ = cheerio.load(body)
	var imgs = $('a.preview-image > img')
	for (var i = 0; i < imgs.length; i++) {
		var link = $(imgs[i]).attr('data-src')
		cats.push(link)
	};
	
	fs.writeFile('data/cats.json',JSON.stringify({"cats":cats}))
})
