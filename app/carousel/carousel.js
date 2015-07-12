'use strict';

angular.module('charlierproctor.carousel', ['ui.router'])

.config(['$stateProvider',
	function($stateProvider) {
	  $stateProvider.state('carousel', {
	    url: '/',
	    templateUrl: 'carousel/carousel.html',
	    controller: 'CarouselCtrl'
	  })
	}])

.controller('CarouselCtrl',['$scope',function($scope){

}])
