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
			restrict: 'AE',
			scope: {
				item: '=',
				bought: '@bought',
				ngClick: '&'
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