'use strict';

angular.module('charlierproctor.keydown', [])
.factory('KeydownService', ['$window','$state',function($window,$state){
	
	var hash = {}

	var registerKeydown = function(state,key,fn){
		if (hash[state]){
			hash[state][key] = fn
		} else {
			hash[state] = {}
			hash[state][key] = fn
		}
	}

	$window.onkeydown = function(event){
		if (hash[$state.current.name]){
			if(hash[$state.current.name][event.keyCode]){
				hash[$state.current.name][event.keyCode]()
			}
		}
	}

	return {
		registerKeydown: registerKeydown
	}
}])