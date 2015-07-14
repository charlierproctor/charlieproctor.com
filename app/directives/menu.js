'use strict';

angular.module('charlierproctor.menu',[])
.directive('menu', [function(){
	return {
		templateUrl: 'directives/menu.html',
		restrict: 'E'
	}
}])