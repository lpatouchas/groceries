(function() {
	'use strict';
	angular.module('myApp.todo').factory('DataService', [
		'$resource', function($resource) {
			return $resource('todo/data/bought.json', {}, {
				getData : {
					method : 'GET',
					params : {},
					isArray : true
				}
			});
		}
	]);
})();