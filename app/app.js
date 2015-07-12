'use strict';

angular.module('charlieproctor.com', [
  'ui.router'
]).
config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
	}]);
