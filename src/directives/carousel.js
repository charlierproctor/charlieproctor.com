'use strict';

angular.module('charlierproctor.carousel', [])
.directive('carousel', ['$interval',function($interval){

	function link(scope, element, attrs) {
        var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
        for (var i = 0; i < images.length; i++) {
            element.append("<img class='carousel' src='img/carousel/" + images[i] + "'>")
        };

        angular.element(element.children()[0]).addClass("opaque")

        var i = 0;
        $interval(function(){
            angular.element(element.children()[i%images.length]).removeClass("opaque")
            angular.element(element.children()[++i%images.length]).addClass("opaque")
        }, attrs['interval']*1000)
	}

	return {
		restrict: 'E',
		link: link
	}
}])
