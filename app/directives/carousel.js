'use strict';

angular.module('charlierproctor.carousel',[])
.directive('carousel', ['$interval','$animate',function($interval,$animate){

	function link(scope, element, attrs) {

		for (var i = 0; i < scope.images.length; i++) {
			element.append("<img class='carousel' src='" + scope.images[i] + "'>")
		};

		angular.element(element.children()[0]).addClass("opaque")

  		var i = 0;
  		$interval(function(){
  			angular.element(element.children()[i%scope.images.length]).removeClass("opaque")
  			angular.element(element.children()[++i%scope.images.length]).addClass("opaque")
  		}, attrs['interval']*1000)
	}

	return {
		restrict: 'E',
		link: link
	}
}])