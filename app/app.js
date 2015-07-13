'use strict';

angular.module('charlierproctor', [
  'ui.router',
  'charlierproctor.splash'
]).
config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	}]);
