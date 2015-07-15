'use strict';

angular.module('charlierproctor', [
  'ui.router',
  'charlierproctor.carousel',
  'charlierproctor.splash',
  'charlierproctor.pages',
  'charlierproctor.menu',
  'charlierproctor.github'
]).
config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	}]).
run(function($rootScope){
  $rootScope.images = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
})
