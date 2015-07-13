'use strict';

angular.module('charlierproctor.carousel',[])
.directive('carousel', function(){

	function link(scope, element, attrs) {
		console.log("hi")
	}

	return {
		restrict: 'E',
		link: link
	}
})