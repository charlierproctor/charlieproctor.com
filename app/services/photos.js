'use strict';

angular.module('charlierproctor.photos', [])
.factory('PhotoService', ['$http',function($http){
	var getFsList = function(imgDir,cb){
		$http.get('/fs_list?dir='+imgDir)
		.success(function(data, status, headers, config) {
			cb(data)
		})
	}
	var getNextPhoto = function(dir,ph,cb){
		getFsList(dir,function(data){
			cb(data.files[(data.files.indexOf(ph) + 1)%data.files.length])
		})
	}
	var getPreviousPhoto = function(dir,ph,cb){
		getFsList(dir,function(data){
			cb(data.files[(data.files.indexOf(ph) - 1 + data.files.length)%data.files.length])
		})
	}
	return {
		getFsList: getFsList,
		getNextPhoto: getNextPhoto,
		getPreviousPhoto: getPreviousPhoto
	}
}])