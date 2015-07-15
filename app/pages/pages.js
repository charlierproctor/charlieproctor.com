'use strict';

angular.module('charlierproctor.pages', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('pages', {
	  	abstrast: true,
	  	templateUrl: 'pages/pages.html',
	  	controller: 'PagesCtrl'
	  })
	  .state('pages.about', {
	    url: '/about',
	    templateUrl: 'pages/about.html',
	    controller: 'AboutCtrl'
	  })
	  .state('pages.experience', {
	  	url: '/experience',
	    templateUrl: 'pages/experience.html',
	    controller: 'ExperienceCtrl'
	  })
	  .state('pages.code', {
	  	url: '/code',
	    templateUrl: 'pages/code.html',
	    controller: 'CodeCtrl'
	  })
	  .state('pages.photography', {
	  	url: '/photo',
	    templateUrl: 'pages/photography.html',
	    controller: 'PhotographyCtrl'
	  })
	  .state('pages.zoom', {
	  	url: '/photo/:photo',
	  	templateUrl: 'pages/photography.zoom.html',
	  	controller: 'PhotographyZoomCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope',function($scope){

}])
.controller('AboutCtrl',['$scope',function($scope){

}])
.controller('ExperienceCtrl',['$scope',function($scope){

}])
.controller('CodeCtrl',['$scope','GitHubService',function($scope,githubService){
	githubService.getRepos(function(data){
		$scope.repos = data;
		githubService.getOctos(data.length,function(urls){
			for (var i = 0; i < urls.length; i++) {
				$scope.repos[i].octo = "https://octodex.github.com" + urls[i]
			};
		})
	})
	
}])
.controller('PhotographyCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$http.get('/photo_list')
	.success(function(data, status, headers, config) {
		$scope.photos = data.images
	})

	$scope.zoom = function(photo){
		$state.go('pages.zoom',{
			photo:photo
		})
	}
}])
.controller('PhotographyZoomCtrl',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
	$scope.photo = $stateParams.photo
}])
