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
	  .state('pages.experience', {
	  	url: '/experience',
	    templateUrl: 'pages/experience.html',
	    controller: 'ExperienceCtrl'
	  })
	  .state('pages.code', {
	  	url: '/code',
	    templateUrl: 'pages/code.html',
	    controller: 'CodeCtrl'
	  })
	  .state('pages.photography', {
	  	url: '/photography',
	    templateUrl: 'pages/photography.html',
	    controller: 'PhotographyCtrl'
	  })
	}])

.controller('PagesCtrl',['$scope',function($scope){

}])
.controller('AboutCtrl',['$scope',function($scope){

}])
.controller('ExperienceCtrl',['$scope',function($scope){

}])
.controller('CodeCtrl',['$scope',function($scope){

}])
.controller('PhotographyCtrl',['$scope',function($scope){

}])