'use strict';

angular.module('charlierproctor.pages', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('about', {
	    url: '/about',
	    templateUrl: 'pages/about.html',
	    controller: 'AboutCtrl'
	  })
	  .state('experience', {
	  	url: '/experience',
	    templateUrl: 'pages/experience.html',
	    controller: 'ExperienceCtrl'
	  })
	  .state('code', {
	  	url: '/code',
	    templateUrl: 'pages/code.html',
	    controller: 'CodeCtrl'
	  })
	  .state('photography', {
	  	url: '/photography',
	    templateUrl: 'pages/photography.html',
	    controller: 'PhotographyCtrl'
	  })
	}])

.controller('AboutCtrl',['$scope',function($scope){

}])
.controller('ExperienceCtrl',['$scope',function($scope){

}])
.controller('CodeCtrl',['$scope',function($scope){

}])
.controller('PhotographyCtrl',['$scope',function($scope){

}])
