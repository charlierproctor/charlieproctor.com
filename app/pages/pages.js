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
	  	url: '/photo/zoom?img',
	  	templateUrl: 'pages/photography.zoom.html',
	  	reloadOnSearch: false,
	  	controller: 'PhotographyZoomCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope','$state','$window','KeydownService',function($scope,$state,$window,keydownService){
	
	keydownService.registerKeydown('pages.about',37,function(){
		$state.go('pages.photography')
	})
	keydownService.registerKeydown('pages.about',39,function(){
		$state.go('pages.code')
	})
	keydownService.registerKeydown('pages.code',37,function(){
		$state.go('pages.about')
	})
	keydownService.registerKeydown('pages.code',39,function(){
		$state.go('pages.photography')
	})
	keydownService.registerKeydown('pages.photography',37,function(){
		$state.go('pages.code')
	})
	keydownService.registerKeydown('pages.photography',39,function(){
		$state.go('pages.about')
	})

}])
.controller('AboutCtrl',['$scope',function($scope){

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
.controller('PhotographyCtrl',['$scope','PhotoService','$state',function($scope,photoService,$state){
	photoService.getImgList('/photos/min',function(photos){
		$scope.photos = photos
	})

	$scope.zoom = function(photo){
		$state.go('pages.zoom',{
			img:photo
		})
	}
}])
.controller('PhotographyZoomCtrl',['$scope','$state','$stateParams','$location','PhotoService','KeydownService',
	function($scope,$state,$stateParams,$location,photoService,keydownService){
		$scope.photo = $stateParams.img
		$scope.close = function(){
			$state.go('pages.photography');
		}
		$scope.next = function(){
			photoService.getNextPhoto($scope.photo, function(next){
				$scope.photo = next;
				$location.search({img:next})
			})
		}
		$scope.previous = function(){
			photoService.getPreviousPhoto($scope.photo, function(prev){
				$scope.photo = prev;
				$location.search({img:prev})
			})
		}

		keydownService.registerKeydown('pages.zoom',27,function(){
			$scope.close()
		})
		keydownService.registerKeydown('pages.zoom',37,function(){
			$scope.next()
		})
		keydownService.registerKeydown('pages.zoom',39,function(){
			$scope.previous()
		})
}])
