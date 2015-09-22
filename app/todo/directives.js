(function() {
	'use strict';
	angular.module('myApp.todo').directive('price', function() {
		return {
			restrict: 'AE',
			scope: {
				price: '@value'
			},
			template : '<strong>{{price}}€</strong>'
		};
	});
	
	
	angular.module('myApp.todo').directive('product', function() {
		return {
			restrict: 'E',
			scope: {
				item: '=',
				bought: '@bought',
				buy: '&',
				restoreItem: '&'
			},
			templateUrl : 'todo/product.html'
		};
	});
	
	angular.module('myApp.todo').directive('productList', function() {
		return {
			scope: {
				toBuy: '=',
			},
			templateUrl : 'todo/productList.html'
		};
	});
	
})();