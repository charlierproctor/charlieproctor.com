'use strict';

angular.module('charlierproctor.carousel',[])
.directive('carousel', ['$interval',function($interval){

	var i = 0;
	var images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
	function link(scope, element, attrs) {
		element.css("background","url(img/1.jpg) no-repeat center center fixed");
		element.css("-webkit-background-size", "cover");
		element.css("-moz-background-size", "cover");
		element.css("-o-background-size", "cover");
  		element.css("background-size", "cover");

  		$interval(function(){
  			element.css("background","url(img/" + images[++i%images.length] + ") no-repeat center center fixed");
  		}, attrs['interval'])
	}

	return {
		link: link
	}
}])