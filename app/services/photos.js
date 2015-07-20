'use strict';

angular.module('charlierproctor.photos', [])
.factory('PhotoService', ['$http',function($http){
	var getFsList = function(imgDir,cb){
		$http.get('/fs_list?dir='+imgDir)
		.success(function(data, status, headers, config) {
			cb(data)
		})
	}
	var strEndsWith = function(str,suffix){
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	var isPhoto = function(f){
		return (strEndsWith(f,'.jpg') && (f[0] != '.'))
	}
	var isAlbum = function(d){
		return ((d.name.slice(0,-1).replace(/^.*\//,'')[0] != '_') 
			&& (d.info != null))
	}
	var getNextPhoto = function(dir,ph,cb){
		getFsList(dir,function(data){
			var photos = data.files.filter(isPhoto)
			cb(photos[(photos.indexOf(ph) + 1)%photos.length])
		})
	}
	var getPreviousPhoto = function(dir,ph,cb){
		getFsList(dir,function(data){
			var photos = data.files.filter(isPhoto)
			cb(photos[(photos.indexOf(ph) - 1 + photos.length)%photos.length])
		})
	}
	return {
		getFsList: getFsList,
		isPhoto: isPhoto,
		isAlbum: isAlbum,
		getNextPhoto: getNextPhoto,
		getPreviousPhoto: getPreviousPhoto
	}
}])