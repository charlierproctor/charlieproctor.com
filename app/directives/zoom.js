'use strict';

angular.module('charlierproctor.zoom',[])
.directive('zoom', function(){

	function link(scope, element, attrs) {
		element.append("<img src='img/photos/full/" + attrs.photo + "'>")
	}

	return {
		restrict: 'E',
		link: link
	}
})