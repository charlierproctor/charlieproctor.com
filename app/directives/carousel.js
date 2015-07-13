'use strict';

angular.module('charlierproctor.carousel',[])
.directive('carousel', ['$interval','$animate',function($interval,$animate){

	function link(scope, element, attrs) {
		element.css("background","url(img/1.jpg) no-repeat center center fixed");
		element.css("-webkit-background-size", "cover");
		element.css("-moz-background-size", "cover");
		element.css("-o-background-size", "cover");
  		element.css("background-size", "cover");

  		element.css("transition","background-image " + attrs["fadeDuration"] + "s ease-in-out")

  		var i = 0;
  		$interval(function(){
  			$animate.animate(element,{},
  			{
				"background":"url(" + scope.images[++i%scope.images.length] + ") no-repeat center center fixed"
  			})
  			// element.css("background","url(" + scope.images[++i%scope.images.length] + ") no-repeat center center fixed");
  		}, attrs['interval']*1000)
	}

	return {
		link: link
	}
}])