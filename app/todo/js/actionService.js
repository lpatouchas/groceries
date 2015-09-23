(function() {
	'use strict';
	angular.module('myApp.todo').factory('ActionsService', [
		'$ngBootbox', actionService
	]);

	function actionService($ngBootbox) {

		/*
		 * Public methods  
		 */

		var add = function(newProductName, newProductPrice, toBuy, bought, scope) {
			if (!(typeof newProductName === 'undefined')) {
				var found = false;
				angular.forEach(bought.concat(toBuy), function(item, index) {
					if (item.name.toLowerCase() == newProductName.toLowerCase()) {
						found = true;
						if (item.price == newProductPrice) {
							restore(toBuy, bought, item);
						} else {
							managePriceDifference(item, newProductPrice, toBuy, bought, scope)
						}
					}
				});

				if (!found) {
					toBuy.push(new product(newProductName, newProductPrice));
				}

			}

		};

		var buy = function(toBuy, bought, item) {
			toBuy.splice(toBuy.indexOf(item), 1);
			item.bought = true;
			bought.push(item);
		}

		var restore = function(toBuy, bought, item) {
			bought.splice(bought.indexOf(item), 1);
			toBuy.push(item);
			item.bought = false;
		}

		var remove = function(bought, item) {
			bought.splice(bought.indexOf(item), 1);
			return bought;
		}

		var calculateTotalPrice = function(toBuy) {
			var total = 0;
			angular.forEach(toBuy, function(value, key) {
				if (!isNaN(value.price)) {
					total += value.price;
				}

			})
			return Math.round(total * 100) / 100;
		}

		/*
		 * Private methods
		 */

		function managePriceDifference(item, newProductPrice, toBuy, bought, scope) {
			var $scope = scope;
			var options = {
				message : 'It seems that the product you are trying to add alreay exists but with different price. Would you like to keep the old price: <span class="price">'
								+ item.price + '</span>, or the new price: <span class="price">' + newProductPrice + '</span>',
				title : 'Price Difference',
				className : 'test-class',
				buttons : {
					warning : {
						label : "Old",
						className : "btn-default",
						callback : function() {
							if (item.bought) {
								restore(toBuy, bought, item);
							}
							$scope.$apply();
						}
					},
					success : {
						label : "New",
						className : "btn-primary",
						callback : function() {
							item.price = newProductPrice;
							if (item.bought) {
								restore(toBuy, bought, item);
							}
							$scope.$apply();
						}
					}
				}
			};

			$ngBootbox.customDialog(options);
		}

		function product(name, price, bought) {
			return {
				name : name,
				price : price,
				bought : bought
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