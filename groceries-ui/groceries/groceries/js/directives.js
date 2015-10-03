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
	
	angular.module('groceriesApp').directive('quantity', function() {
		return {
			restrict: 'AE',
			scope: {
				quantity: '@value'
			},
			template : '<span class="quantity-x-sml">x</span><span class="quantity">{{quantity}}</span>'
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
				edit: '&',
				update: '&'
			},
			templateUrl : 'groceries/product.html'
		};
	});
	
	angular.module('groceriesApp').directive('stopEvent', function () {
	    return {
	      restrict: 'A',
	      link: function (scope, element, attr) {
	        element.on(attr.stopEvent, function (e) {
	          e.stopPropagation();
	        });
	      }
	    };
	  });
})();