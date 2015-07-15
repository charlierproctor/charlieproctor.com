'use strict';

angular.module('charlierproctor.github', [])
.factory('GitHubService', ['$http',function($http){

	var getRepo = function(repo,cb){
		$http.get('https://api.github.com/repos/'+repo)
		.success(function(data, status, headers, config) {
			cb(data)
	  	});
	}

	var fetchRepoList = function(cb){
		$http.get('data/repos.json')
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

	var getOctos = function(num, cb){
		var res = []
		$http.get('data/cats.json')
	       .success(function(data, status, headers, config){
				var cats = data["cats"]
				for (var i = 0; i < num; i++) {
					res.push(cats[Math.floor(Math.random()*cats.length)])
				};
				cb(res)
	        });
	}
  	return {
  		getRepos: getRepos,
  		getOctos: getOctos
  	}
}])

