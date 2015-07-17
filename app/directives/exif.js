'use strict';

angular.module('charlierproctor.exif',[])
.directive('exif', function(){

	function link(scope, element, attrs) {
		element.on('load',function(){
			EXIF.getData(element[0], function() {
		    	scope.cb(EXIF.getAllTags(this))
		    });
		})
	}

	return {
	   	restrict: 'A',
		link: link,
		scope: {
			cb: '='
		}
	}
})