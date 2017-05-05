'use strict';

angular.module('charlierproctor.splash', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('splash', {
	    url: '/',
	    templateUrl: 'partials/splash.html',
	    controller: 'SplashCtrl'
	  })
	}])

.controller('SplashCtrl',['$scope','$state',function($scope,$state){
	$scope.info = function(subj){
				$state.go('pages.' + subj)
			}
}])
