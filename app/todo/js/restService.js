(function() {
	'use strict';
	angular.module('myApp.todo').factory('DataService', [
		'$resource', function($resource) {

			return {
				toBuy : $resource('todo/data/toBuy.json', {}, {
					getData : {
						method : 'GET',
						params : {},
						isArray : true
					}
				}),

				bought : $resource('todo/data/bought.json', {}, {
					getData : {
						method : 'GET',
						params : {},
						isArray : true
					}
				})
			};
		}
	]);
})();