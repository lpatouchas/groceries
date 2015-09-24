(function() {
	'use strict';
	angular.module('groceriesApp').factory('ActionsService', [
		'$ngBootbox', actionService
	]);

	function actionService($ngBootbox) {

		/*
		 * Public methods  
		 */

		var add = function(newProductName, newProductPrice, products) {
			if (!(typeof newProductName === 'undefined' || typeof newProductPrice === 'undefined')) {
				var found = false;
				angular.forEach(products, function(item, index) {
					if (item.name.toLowerCase() == newProductName.toLowerCase()) {
						found = true;
						item.price = newProductPrice
						restore(item);
					}
				});

				if (!found) {
					products.push(new product(newProductName, newProductPrice, false));
				}

			} else {
				$ngBootbox.alert('Please add a both Product name & price!');
			}

		};

		var buy = function(item) {
			item.checked = true;
		}

		var restore = function(item) {
			item.checked = false;
		} 

		var remove = function(products, item) {
			products.splice(products.indexOf(item), 1);
			return products;
		}

		var calculateTotalPrice = function(products) {
			var total = 0;
			angular.forEach(products, function(value, key) {
				if (!value.checked && !isNaN(value.price)) {
					total += value.price;
				}

			})
			return Math.round(total * 100) / 100;
		}

		/*
		 * Private methods
		 */

		function product(name, price, checked) {
			return {
				name : name,
				price : price,
				checked : checked
			}
		}

		/*
		 * Return
		 */
		return {
			add : add,
			buy : buy,
			remove : remove,
			restore : restore,
			calculateTotalPrice : calculateTotalPrice
		}
	}
})();