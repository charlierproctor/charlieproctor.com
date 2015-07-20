'use strict';

angular.module('charlierproctor.menu',[])
.directive('menu', ['$state',function($state){
	return {
		templateUrl: 'directives/menu.html',
		restrict: 'E',
		link: function(scope){
			scope.info = function(subj){
				if (subj == 'photography'){
					$state.go('pages.' + subj, {
						album: ''
					}, { 
						reload: true
					})	
				} else {
					$state.go('pages.' + subj)
				}
			}
			scope.home = function(){
				$state.go('splash')
			}
		}
	}
}])