'use strict';

angular.module('charlierproctor.photos', [])
.factory('PhotoService', ['$http',function($http){
	var getImgList = function(imgDir,cb){
		$http.get('/fs_list?dir=/img'+imgDir)
		.success(function(data, status, headers, config) {
			cb(data.files)
		})
	}
	var getNextPhoto = function(current,cb){
		getImgList('/photos/min',function(photos){
			cb(photos[(photos.indexOf(current) + 1)%photos.length])
		})
	}
	var getPreviousPhoto = function(current,cb){
		getImgList('/photos/min',function(photos){
			cb(photos[(photos.indexOf(current) - 1 + photos.length)%photos.length])
		})
	}
	return {
		getImgList: getImgList,
		getNextPhoto: getNextPhoto,
		getPreviousPhoto: getPreviousPhoto
	}
}])