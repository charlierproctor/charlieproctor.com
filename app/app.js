'use strict';

angular.module('charlierproctor', [
  'ui.router',
  'charlierproctor.carousel'
]).
config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	}]);
