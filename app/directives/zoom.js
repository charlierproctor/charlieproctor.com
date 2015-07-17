'use strict';

angular.module('charlierproctor.zoom',[])
.directive('zoom', function(){

	function flip(num){ return (num ? 0 : 1) }
	function link(scope, element, attrs) {
		scope.current = 0
		scope.imgs = []
		scope.imgs.push(scope.photo)

		scope.$watch('photo',function(newVal,oldVal){
			if (newVal != oldVal){
				angular.element(element.children()[scope.current]).removeClass('opaque')
				scope.imgs[scope.current = flip(scope.current)] = newVal
			}
		})
	}
	return {
		restrict: 'E',
		link: link,
		templateUrl: 'directives/zoom.html'
	}
})
.directive('photo',function(){
	return {
		restrict: 'C',
		link: function(scope, element, attrs){
			element.on('load', function(){
				element.addClass('opaque')
			})
		}
	}
})