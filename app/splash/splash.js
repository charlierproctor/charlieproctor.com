'use strict';

angular.module('charlierproctor.splash', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('splash', {
	    url: '/',
	    templateUrl: 'splash/splash.html',
	    controller: 'SplashCtrl'
	  })
	}])

.controller('SplashCtrl',['$scope','$state',function($scope,$state){
	$scope.info = function(subj){
		$state.go(subj)
	}
}])
