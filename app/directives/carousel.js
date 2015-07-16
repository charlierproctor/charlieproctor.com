'use strict';

angular.module('charlierproctor.carousel',['charlierproctor.photos'])
.directive('carousel', ['$interval','PhotoService',function($interval,photoService){

	function link(scope, element, attrs) {
		photoService.getImgList('/carousel',function(images){
			for (var i = 0; i < images.length; i++) {
				element.append("<img class='carousel' src='img/carousel/" + images[i] + "'>")
			};

			angular.element(element.children()[0]).addClass("opaque")

	  		var i = 0;
	  		$interval(function(){
	  			angular.element(element.children()[i%images.length]).removeClass("opaque")
	  			angular.element(element.children()[++i%images.length]).addClass("opaque")
	  		}, attrs['interval']*1000)
		})
	}

	return {
		restrict: 'E',
		link: link
	}
}])