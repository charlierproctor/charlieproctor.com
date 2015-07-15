'use strict';

angular.module('charlierproctor.photos', [])
.factory('PhotoService', ['$http',function($http){
	var getPhotoList = function(cb){
		$http.get('/photo_list')
		.success(function(data, status, headers, config) {
			cb(data.images)
		})
	}
	var getNextPhoto = function(current,cb){
		getPhotoList(function(photos){
			cb(photos[(photos.indexOf(current) + 1)%photos.length])
		})
	}
	var getPreviousPhoto = function(current,cb){
		getPhotoList(function(photos){
			cb(photos[(photos.indexOf(current) - 1 + photos.length)%photos.length])
		})
	}
	return {
		getPhotoList: getPhotoList,
		getNextPhoto: getNextPhoto,
		getPreviousPhoto: getPreviousPhoto
	}
}])