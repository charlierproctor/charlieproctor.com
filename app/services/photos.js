'use strict';

angular.module('charlierproctor.photos', [])
.factory('PhotoService', ['$http',function($http){
	var getFsList = function(imgDir,cb){
		$http.get('/fs_list?dir='+imgDir)
		.success(function(data, status, headers, config) {
			cb(data)
		})
	}
	var getNextPhoto = function(current,cb){
		getFsList('/photos/min',function(photos){
			cb(photos[(photos.indexOf(current) + 1)%photos.length])
		})
	}
	var getPreviousPhoto = function(current,cb){
		getFsList('/photos/min',function(photos){
			cb(photos[(photos.indexOf(current) - 1 + photos.length)%photos.length])
		})
	}
	return {
		getFsList: getFsList,
		getNextPhoto: getNextPhoto,
		getPreviousPhoto: getPreviousPhoto
	}
}])