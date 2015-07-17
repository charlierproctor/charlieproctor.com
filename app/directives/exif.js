'use strict';

angular.module('charlierproctor.exif',[])
.directive('exif', function(){

	function link(scope, element, attrs) {
		element.on('load',function(){
			EXIF.getData(element[0], function() {
		    	scope.exif = EXIF.getAllTags(this)
		    	scope.$apply()
		    });
		})
	}

	return {
	   	restrict: 'A',
		link: link,
		scope: {
			exif: '='
		}
	}
})