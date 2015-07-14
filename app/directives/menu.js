'use strict';

angular.module('charlierproctor.menu',[])
.directive('menu', ['$state',function($state){
	return {
		templateUrl: 'directives/menu.html',
		restrict: 'E',
		link: function(scope){
			scope.info = function(subj){
				$state.go('pages.' + subj)
			}
		}
	}
}])