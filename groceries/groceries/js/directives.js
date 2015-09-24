(function() {
	'use strict';
	
	angular.module('groceriesApp').directive('price', function() {
		return {
			restrict: 'AE',
			scope: {
				price: '@value'
			},
			template : '<strong>{{price}}€</strong>'
		};
	});
	
	
	angular.module('groceriesApp').directive('product', function() {
		return {
			restrict: 'E',
			scope: {
				item: '=',
				checked: '@checked',
				buy: '&',
				restore: '&',
				remove: '&'
			},
			templateUrl : 'groceries/product.html'
		};
	});
})();