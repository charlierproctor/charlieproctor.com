'use strict';

angular.module('charlierproctor.carousel',[])
.directive('carousel', ['$interval',function($interval){

	function link(scope, element, attrs) {
		element.css("background","url(img/1.jpg) no-repeat center center fixed");
		element.css("-webkit-background-size", "cover");
		element.css("-moz-background-size", "cover");
		element.css("-o-background-size", "cover");
  		element.css("background-size", "cover");

  		var i = 0;
  		$interval(function(){
  			element.css("background","url(" + scope.carouselImages[++i%scope.carouselImages.length] + ") no-repeat center center fixed");
  		}, attrs['interval'])
	}

	return {
		link: link
	}
}])