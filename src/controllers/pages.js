'use strict';

angular.module('charlierproctor.pages', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('pages', {
	  	abstrast: true,
	  	templateUrl: 'partials/pages.html',
	  	controller: 'PagesCtrl'
	  })
	  .state('pages.about', {
	    url: '/about',
	    templateUrl: 'partials/about.html',
	    controller: 'AboutCtrl'
	  })
	  .state('pages.code', {
	  	url: '/code',
	    templateUrl: 'partials/code.html',
	    controller: 'CodeCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope','$state','$window',function($scope,$state,$window){

}])
.controller('AboutCtrl',['$scope','$state',function($scope,$state){

}])
.controller('CodeCtrl',['$scope','GitHubService','$state',
	function($scope,githubService,$state){

	githubService.getRepos(function(data){
		$scope.repos = data;
		githubService.getOctos(data.length,function(urls){
			for (var i = 0; i < urls.length; i++) {
				$scope.repos[i].octo = "https://octodex.github.com" + urls[i]
			};
		})
	})
	
}])
