'use strict';

angular.module('charlierproctor', [
  'ui.router',
  'charlierproctor.carousel',
  'charlierproctor.splash',
  'charlierproctor.pages',
  'charlierproctor.menu',
  'charlierproctor.github',
  'charlierproctor.photos',
  'charlierproctor.keydown',
  'charlierproctor.exif'
]).
config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	}]).
run(['$rootScope','$location','$window',function($rootScope, $location, $window){
  $rootScope.images = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
  $rootScope.$on('$stateChangeSuccess',function(event){
    if (!$window.ga){
      return;
    }
    $window.ga('send','pageview', { page:$location.path() })
  })
}])
