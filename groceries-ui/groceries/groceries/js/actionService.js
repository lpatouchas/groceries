(function() {
	'use strict';
	angular.module('groceriesApp').factory('ActionsService', [
		'$ngBootbox','blockUI','DataService', actionService
	]);

	function actionService($ngBootbox, blockUI, DataService) {
		
		/*
		 * Public methods  
		 */
		var get = function(){
			blockUI.start();
			return DataService.getProducts().$promise.then(function(data) {
				return data;
			}, function(error) {
				alertError(error);
			})['finally'](function() {
				blockUI.stop();
			});
		}

		var add = function(newProductName, newProductPrice, newProductQuantity, products) {
			if (!(typeof newProductName === 'undefined' || typeof newProductPrice === 'undefined')) {
				var found = false;
				angular.forEach(products, function(item, index) {
					if (item.name.toLowerCase() == newProductName.toLowerCase()) {
						found = true;
						item.price = newProductPrice
						item.quantity = newProductQuantity;
						restore(item);
					}
				});

				if (!found) {
					DataService.saveProduct(new product('',newProductName, newProductPrice,newProductQuantity, false)).$promise.then(function(data) {
						products.push(data);
					}, function(error) {
						alertError(error);
					})['finally'](function() {
						// TODO here I should stop the window mask.
					});
					
				}

			} else {
				$ngBootbox.alert('Please add a both Product name & price!');
			}

		};
			
		
		var check = function(item) {
			item.checked = true;
			DataService.saveProduct(item).$promise.then(function(data) {
			}, function(error) {
				item.checked = false;
				alertError(error);
			})['finally'](function() {
				// TODO here I should stop the window mask.
			});
		}

		var restore = function(item) {
			item.checked = false;
			DataService.saveProduct(item).$promise.then(function(data) {
			}, function(error) {
				item.checked = true;
				alertError(error);
			})['finally'](function() {
				// TODO here I should stop the window mask.
			});
		} 

		var remove = function(products, item) {
			
			$ngBootbox.confirm('Delete <strong>'+item.name+'</strong> ?')
		    .then(function() {
		    	DataService.deleteProduct(item).$promise.then(function() {
					products.splice(products.indexOf(item), 1);
				}, function(error) {
					alertError(error);
				})['finally'](function() {
					// TODO here I should stop the window mask.
				});
				return products;
		    }, function() {
		        console.log('Confirm dismissed!');
		    });
			
			
		}

		var calculateTotalPrice = function(products) {
			var total = 0;
			angular.forEach(products, function(value, key) {
				if (!value.checked && !isNaN(value.price)) {
					var itemTotal = value.price * value.quantity;
					total += itemTotal;
				}
			})
			return Math.round(total * 100) / 100;
		}

		/*
		 * Private methods
		 */

		function product(id, name, price, quantity, checked) {
			return {
				id: id,
				name : name,
				price : price,
				quantity: isNaN(quantity) ? 1 : quantity,
				checked : checked
			}
		}

		/*
		 * Return
		 */
		return {
			get : get,
			add : add,
			check : check,
			remove : remove,
			restore : restore,
			calculateTotalPrice : calculateTotalPrice
		}
		
		function alertError(error) {
			$ngBootbox.alert("There was an error during this action. <br />Error code: " + error.status + ", " + error.data+"<br /><strong>Please retry</strong>");
		}
	}
})();



