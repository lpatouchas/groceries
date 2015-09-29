(function() {
	'use strict';
	angular.module('groceriesApp').factory('GroceriesService', [
		'$ngBootbox','blockUI','ProductsService', actionService
	]);

	function actionService($ngBootbox, blockUI, ProductsService) {
		
		/*
		 * Public methods  
		 */
		var getProducts = function(){
			blockUI.start();
			return ProductsService.query().$promise.then(function(data) {
				return data;
			}, function(error) {
				alertError(error);
			})['finally'](function() {
				blockUI.stop();
			});
		}

		var addProduct = function(newProductName, newProductPrice, newProductQuantity, products) {
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
					blockUI.start("Saving...");
					ProductsService.save(new product('',newProductName, newProductPrice,newProductQuantity, false)).$promise.then(function(data) {
						products.push(data);
					}, function(error) {
						alertError(error);
					})['finally'](function() {
						blockUI.stop();
					});
					
				}

			} else {
				$ngBootbox.alert('Please add a both Product name & price!');
			}

		};
		
		var updateProduct = function(item) {
			blockUI.start("Saving...");
			ProductsService.save(item).$promise.then(function(data) {
			}, function(error) {
				alertError(error);
			})['finally'](function() {
				blockUI.stop();
			});
		}
			
		
		var checkProduct = function(item) {
			checkOrRestore(item, true);
		}

		var uncheckProduct = function(item) {
			checkOrRestore(item, false);
		} 
		
		var removeProduct = function(products, item) {
			$ngBootbox.confirm('Delete <strong>'+item.name+'</strong> ?')
		    .then(function() {
		    	blockUI.start("Saving...");
		    	ProductsService.remove(item).$promise.then(function() {
					products.splice(products.indexOf(item), 1);
				}, function(error) {
					alertError(error);
				})['finally'](function() {
					blockUI.stop();
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

		function checkOrRestore(item, check){
			item.checked = check;
			blockUI.start("Saving...");
			ProductsService.save(item).$promise.then(function(data) {
			}, function(error) {
				item.checked = !check;
				alertError(error);
			})['finally'](function() {
				blockUI.stop();
			});
		}
		
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
			getProducts : getProducts,
			addProduct : addProduct,
			updateProduct: updateProduct,
			checkProduct : checkProduct,
			uncheckProduct : uncheckProduct,
			removeProduct : removeProduct,
			calculateTotalPrice : calculateTotalPrice
		}
		
		function alertError(error) {
			$ngBootbox.alert("There was an error during this action. <br />Error code: " + error.status + ", " + error.data+"<br /><strong>Please retry</strong>");
		}
	}
})();



