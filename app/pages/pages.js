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
	  	url: '/photo?dir',
	    templateUrl: 'pages/photography.html',
	    controller: 'PhotographyCtrl'
	  })
	  .state('pages.zoom', {
	  	url: '/photo/zoom?dir&img',
	  	templateUrl: 'pages/photography.zoom.html',
	  	reloadOnSearch: false,
	  	controller: 'PhotographyZoomCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope','$state','$window','KeydownService',function($scope,$state,$window,keydownService){
	
	// escape to splash page
	keydownService.registerKeydown('pages.about',27,function(){
		$state.go('splash')
	})
	keydownService.registerKeydown('pages.code',27,function(){
		$state.go('splash')
	})

	// arrow navigation between states
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
.controller('PhotographyCtrl',['$scope','PhotoService','KeydownService','$state','$location',
	function($scope,photoService,keydownService,$state,$location){

	function strEndsWith(str,suffix){
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}

	photoService.getFsList($state.params.dir || 'img/photos',function(hash){
		$scope.process(hash)
	})

	$scope.process = function(dir){
		$scope.current = dir
		$scope.directories = dir.directories.filter(function(d){
			return !strEndsWith(d.name,'min') && !strEndsWith(d.name,'full')
		})
		var min = dir.directories.filter(function(d){ 
			return strEndsWith(d.name,'min')
		})
		if (min.length == 1) {
			$scope.photos = min[0].files.filter(function(f){
				return strEndsWith(f,'.jpg')
			})
		}
		$scope.isAlbum = ($scope.current.info != null)
	}

	// open a subdirectory
	$scope.open = function(dir){
		$location.search({ 
			dir: dir 
		})
		$scope.process($scope.current.directories.filter(function(d){ 
			return d.name == dir 
		})[0])
	}

	$scope.zoom = function(photo){
		$state.go('pages.zoom',{
			dir:$scope.current.name,
			img:photo
		})
	}

	$scope.close = function(){
		if ($scope.isAlbum){
			$state.go('pages.photography',{
				dir: ''
			})
		} else {
			$state.go('splash')
		}
	}

	keydownService.registerKeydown('pages.photography',27,function(){
		$scope.close()
	})
	keydownService.registerKeydown('pages.photography',37,function(){
		if (!$scope.isAlbum){
			$state.go('pages.code')
		}
	})
	keydownService.registerKeydown('pages.photography',39,function(){
		if (!$scope.isAlbum){
			$state.go('pages.about')
		}
	})

}])
.controller('PhotographyZoomCtrl',['$scope','$state','$location','PhotoService','KeydownService',
	function($scope,$state,$location,photoService,keydownService){
		$scope.dir = $state.params.dir
		$scope.photo = $state.params.img
		$scope.showData = false
		$scope.close = function(){
			$state.go('pages.photography',{
				dir: $scope.dir
			});
		}
		$scope.next = function(){
			photoService.getNextPhoto($scope.dir + '/min', $scope.photo, function(next){
				$scope.photo = next;
				$location.search({
					dir: $scope.dir,
					img:next
				})
			})
		}
		$scope.previous = function(){
			photoService.getPreviousPhoto($scope.dir + '/min', $scope.photo, function(prev){
				$scope.photo = prev;
				$location.search({
					dir: $scope.dir,
					img:prev
				})
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
