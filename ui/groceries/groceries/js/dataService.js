(function() {
	'use strict';
	angular.module('groceriesApp').factory('DataService', [
		'$resource', function($resource) {

			var products = $resource('http://83.212.110.141:8080/groceries-backend/rest/groceries');
			return {
				getProducts : products.query,
				saveProduct : products.save,
				deleteProduct : products.remove
			};
		}
	]);
})();