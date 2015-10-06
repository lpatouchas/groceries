(function() {
	'use strict';
	angular.module('groceriesApp').factory('GroceriesService', [
		'$ngBootbox','locale','ProductsService', actionService
	]);

	function actionService($ngBootbox,locale, ProductsService) {
		
		var dltLabel;
		var saveLabel;
		var loadingLabel;
		var addErrorlbl;
		var genericErrorlbl;
		var genericErrorCodelbl;
		var genericErrorRetrylbl;
		var questionMarklbl;
		
		var changeLanguage = function (lang){
			locale.ready('common').then(function () {
				if ('gr' == lang){
					locale.setLocale('el-gr');
				} else {
					locale.setLocale('en-US');
				}
			});
		}
		
		locale.ready('common').then(function () {
			dltLabel = locale.getString('common.delete');
			saveLabel = locale.getString('common.save');
			loadingLabel = locale.getString('common.loading');
			addErrorlbl = locale.getString('common.addError');
			genericErrorlbl = locale.getString('common.genericError');
			genericErrorCodelbl = locale.getString('common.genericErrorCode');
			genericErrorRetrylbl = locale.getString('common.genericErrorRetry');
			questionMarklbl = locale.getString('common.questionMark');
        });
		
		/*
		 * Public methods  
		 */
		var getProducts = function(){
			showSpinner();
			return ProductsService.query().$promise.then(function(data) {
				return data;
			}, function(error) {
				alertError(error);
			})['finally'](function() {
				hideSpinner();
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
					showSpinner();
					ProductsService.save(new product('',newProductName, newProductPrice,newProductQuantity, false)).$promise.then(function(data) {
						products.push(data);
					}, function(error) {
						alertError(error);
					})['finally'](function() {
						hideSpinner();
					});
					
				}

			} else {
				$ngBootbox.alert(addErrorlbl);
			}

		};
		
		var updateProduct = function(item) {
			showSpinner();
			ProductsService.save(item).$promise.then(function(data) {
			}, function(error) {
				alertError(error);
			})['finally'](function() {
				hideSpinner();
			});
		}
			
		
		var checkProduct = function(item) {
			checkOrRestore(item, true);
		}

		var uncheckProduct = function(item) {
			checkOrRestore(item, false);
		} 
		
		var removeProduct = function(products, item) {
			showSpinner();
		    	ProductsService.remove(item).$promise.then(function() {
					products.splice(products.indexOf(item), 1);
				}, function(error) {
					alertError(error);
				})['finally'](function() {
					hideSpinner();
				});
				return products;
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
			showSpinner();
			item.checked = check;
			ProductsService.save(item).$promise.then(function(data) {
			}, function(error) {
				item.checked = !check;
				alertError(error);
			})['finally'](function() {
				hideSpinner();
			});
		}
		
		var product = function (id, name, price, quantity, checked) {
			return {
				id: id,
				name : name,
				price : price,
				quantity: isNaN(quantity) ? 1 : quantity,
				checked : checked
			}
		}
		
		var spinnerId = "#updSpinner";
		function showSpinner(){
			$(spinnerId).show();
		}
		
		function hideSpinner(){
			$(spinnerId).hide();
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
			calculateTotalPrice : calculateTotalPrice,
			changeLanguage: changeLanguage,
			product : product
		}
		
		function alertError(error) {
			$ngBootbox.alert(genericErrorlbl+" <br />"+genericErrorCodelbl+": " + error.status + ", " + error.data+"<br /><strong>"+genericErrorRetrylbl+"</strong>");
		}
	}
})();



