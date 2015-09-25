(function() {
	'use strict';
	angular.module('groceriesApp').factory('DataService', [
		'$resource', function($resource) {

			var products = $resource('http://localhost:8080/groceries-backend-0.1-SNAPSHOT/rest/groceries');
			return {
				getProducts : products.query,
				saveProduct : products.save,
				deleteProduct : products.remove
			};
		}
	]);
})();