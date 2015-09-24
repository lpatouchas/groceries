(function() {
	'use strict';
	angular.module('groceriesApp').factory('DataService', [
		'$resource', function($resource) {

			return {
				products : $resource('groceries/data/products.json', {}, {
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