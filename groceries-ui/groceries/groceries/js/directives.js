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
				check: '&',
				restore: '&',
				remove: '&',
				onshow: '&',
				onhide: '&',
				editId: '=',
				update: '&'
			},
			templateUrl : 'groceries/product.html'
		};
	});
})();