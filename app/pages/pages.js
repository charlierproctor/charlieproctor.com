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
	  	url: '/photo?album',
	    templateUrl: 'pages/photography.html',
	  	reloadOnSearch: false,
	    controller: 'PhotographyCtrl'
	  })
	  .state('pages.zoom', {
	  	url: '/photo/zoom?album&img',
	  	templateUrl: 'pages/photography.zoom.html',
	  	reloadOnSearch: false,
	  	controller: 'PhotographyZoomCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope','$state','$window','KeydownService',function($scope,$state,$window,keydownService){

}])
.controller('AboutCtrl',['$scope','$state','KeydownService',function($scope,$state,keydownService){

	keydownService.registerKeydown('pages.about',27,function(){
		$state.go('splash')
	})
	keydownService.registerKeydown('pages.about',37,function(){
		$state.go('pages.photography')
	})
	keydownService.registerKeydown('pages.about',39,function(){
		$state.go('pages.code')
	})

}])
.controller('CodeCtrl',['$scope','GitHubService','$state','KeydownService',
	function($scope,githubService,$state,keydownService){

	githubService.getRepos(function(data){
		$scope.repos = data;
		githubService.getOctos(data.length,function(urls){
			for (var i = 0; i < urls.length; i++) {
				$scope.repos[i].octo = "https://octodex.github.com" + urls[i]
			};
		})
	})

	keydownService.registerKeydown('pages.code',27,function(){
		$state.go('splash')
	})
	keydownService.registerKeydown('pages.code',37,function(){
		$state.go('pages.about')
	})
	keydownService.registerKeydown('pages.code',39,function(){
		$state.go('pages.photography')
	})
	
}])
.controller('PhotographyCtrl',['$scope','PhotoService','KeydownService','$state','$location','PHOTOS',
	function($scope,photoService,keydownService,$state,$location,PHOTOS){

	photoService.getFsList(PHOTOS.ROOT,function(hash){
		$scope.root = hash
	})

	photoService.getFsList(PHOTOS.ROOT + ($state.params.album ? $state.params.album + '/' : ''),function(hash){
		$scope.go(hash)
	})

	$scope.go = function(dir){
		$scope.current = dir
		$scope.isAlbum = photoService.isAlbum($scope.current)
		$scope.directories = $scope.current.directories.filter(photoService.isAlbum)
		if ($scope.isAlbum) {
			$scope.photos = $scope.current.files.filter(photoService.isPhoto)
		} else {
			$scope.photos = []
		}
		$location.search({ 
			album: $scope.current.name.replace(PHOTOS.ROOT, "").slice(0,-1)
		})
	}

	$scope.open = function(dir){
		$scope.go($scope.current.directories.filter(function(d){ 
			return d.name == dir 
		})[0])
	}

	$scope.zoom = function(photo){
		$state.go('pages.zoom',{
			album:$scope.current.name.replace(PHOTOS.ROOT, "").slice(0,-1),
			img:photo
		})
	}

	$scope.close = function(){
		if ($scope.isAlbum){
			$scope.go($scope.root)
			$scope.$apply()
		} else {
			$state.go('splash')
		}
	}
	$scope.previousAlbum = function(){
		photoService.getAlbum($scope.root,$scope.current,-1,function(prev){
			$scope.go(prev)
		})
	}
	$scope.nextAlbum = function(){
		photoService.getAlbum($scope.root,$scope.current,1,function(next){
			$scope.go(next)
		})
	}

	keydownService.registerKeydown('pages.photography',27,function(){
		$scope.close()
	})
	keydownService.registerKeydown('pages.photography',37,function(){
		if ($scope.isAlbum){
			$scope.previousAlbum()
			$scope.$apply()
		} else {
			$state.go('pages.code')
		}
	})
	keydownService.registerKeydown('pages.photography',39,function(){
		if ($scope.isAlbum){
			$scope.nextAlbum()
			$scope.$apply()
		} else {
			$state.go('pages.about')
		}
	})

}])
.controller('PhotographyZoomCtrl',['$scope','$state','$location','PhotoService','KeydownService','PHOTOS',
	function($scope,$state,$location,photoService,keydownService,PHOTOS){
		$scope.album = $state.params.album
		$scope.photo = $state.params.img
		$scope.showData = false
		$scope.close = function(){
			$state.go('pages.photography',{
				album: $scope.album
			});
		}
		$scope.go = function(next){
			$scope.photo = next;
			$location.search({
				album: $scope.album,
				img:next
			})
		}
		$scope.next = function(){
			photoService.getNextPhoto(PHOTOS.ROOT + $scope.album + '/', $scope.photo, function(next){
				$scope.go(next)
			})
		}
		$scope.previous = function(){
			photoService.getPreviousPhoto(PHOTOS.ROOT + $scope.album + '/', $scope.photo, function(prev){
				$scope.go(prev)
			})
		}

		keydownService.registerKeydown('pages.zoom',27,function(){
			$scope.close()
		})
		keydownService.registerKeydown('pages.zoom',37,function(){
			$scope.previous()
		})
		keydownService.registerKeydown('pages.zoom',39,function(){
			$scope.next()
		})

		keydownService.registerKeydown('pages.zoom',73,function(){
			$scope.showData = !$scope.showData
			$scope.$apply()
		})

		$scope.calc = function(num){
			if (num && num.numerator && num.denominator) {
				return num.numerator/num.denominator;
			} else {
				return 0
			}
		}
		$scope.shutter = function(ss){
			if (ss){
				if (ss.numerator / ss.denominator >= 0.3){
					var ra = ss.numerator / ss.denominator
					var fl = Math.floor(ra)
					var re = Math.round(10*(ra - fl))
					return fl + "''" + re
				} else {
					return ss.numerator + "/" + ss.denominator
				}
			} else {
				return 0
			}
		}

}])
