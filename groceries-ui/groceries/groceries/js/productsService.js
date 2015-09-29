(function() {
	'use strict';
	angular.module('groceriesApp').factory('ProductsService', [
		'$resource', function($resource) {

			return $resource('http://83.212.110.141:8080/groceries-backend/rest/groceries', {}, {
				save : {
					method : 'POST'
				},
				query : {
					method : 'GET',
					isArray : true
				},
				'delete' : {
					method : 'DELETE'
				}
			});
			// return {
			// getProducts : products.query,
			// saveProduct : products.save,
			// deleteProduct : products.remove
			// };
		}
	]);
})();