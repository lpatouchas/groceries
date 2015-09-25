(function() {
	'use strict';
	angular.module('groceriesApp').factory('DataService', [
		'$resource', function($resource) {

			var products = $resource('groceries/data/products.json');
			return {
				getProducts : products.query
			};
		}
	]);
})();