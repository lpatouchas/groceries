(function() {
	'use strict';
	angular.module('dataService', ['ngResource'])
	.factory('DataService', function($resource) {
	  return $resource('todo/data/bought.json',{ }, {
	    getData: {method:'GET', isArray: true}
	  });
	});
})();