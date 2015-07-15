'use strict';

angular.module('charlierproctor.github', [])
.factory('GitHubService', ['$http',function($http){

	var fetchLanguage = function(repo,cb){
		$http.get('https://api.github.com/repos/'+repo+'/languages')
		.success(function(data, status, headers, config) {
			cb(data)
	  	});
	}

	var getRepo = function(repo,cb){
		$http.get('https://api.github.com/repos/'+repo)
		.success(function(data, status, headers, config) {
			cb(data)
	  	});
	}

	var fetchRepoList = function(cb){
		$http.get('services/repos.json')
	       .success(function(data, status, headers, config){
				cb(data)              
	        });
	}

	var getRepos = function(cb){
		var res = []
		fetchRepoList(function(data){
			var repos = data["repos"]
			for (var i = 0; i < repos.length; i++) {
				getRepo(repos[i],function(data){
					res.push(data)
					if (res.length == repos.length){
						cb(res)
					}
				})
			};
		})
	}

	var getOcto = function(num,cb){
		$http.get('http://octodex.github.com')
		.success(function(data, status, headers, config) {
			var links = []
			var a = angular.element(data).find('a')
			for (var i = 0; i < a.length; i++) {
				if (angular.element(a[i]).hasClass('preview-image')) {
					links.push(angular.element(a[i]).attr('href'))
				}
			};

			var cats = []
			for (var i = 0; i < num; i++) {
				cats.push(links[Math.floor(Math.random()*links.length)])
			};
			cb(cats)
	  	});
	}

  	return {
  		getRepos: getRepos,
  		getOcto: getOcto
  	}
}])

