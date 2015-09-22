(function() {
	'use strict';

	angular.module('myApp.todo').controller('TodoCtrl', [
		'$scope', '$routeParams', '$http', '$ngBootbox', 'DataService', todoCtrl
	]);

	function todoCtrl($scope, $routeParams, $http, $ngBootbox, DataService) {

		

		$scope.toBuy = DataService.getData();

		$scope.bought = [
			product('cucumbers', parseFloat('1.5'), true)
		];
		
		$scope.add = function() {
			if ($scope.newProductName != '' && $scope.newProductName != 'undefined') {
				var found = false;
				angular.forEach($scope.bought.concat($scope.toBuy), function(item, index) {
					if (item.name == $scope.newProductName) {
						found = true;
						if (item.price == $scope.newProductPrice){
							$scope.restoreItem(item);
						} else {
							var options = {
								message : 'It seems that the product you are trying to add alreay exists but with different price. Would you like to keep the old price: <span class="price">'+item.price+'</span>, or the new price: <span class="price">'+$scope.newProductPrice+'</span>',
								title : 'Price Difference',
								className : 'test-class',
								buttons : {
									warning : {
										label : "Old",
										className : "btn-default",
										callback : function() {
											if (item.bought){
												$scope.restoreItem(item);
											}
											restoreInput();
											$scope.$apply();
										}
									},
									success : {
										label : "New",
										className : "btn-primary",
										callback : function() {
											item.price = $scope.newProductPrice;
											if (item.bought){
												$scope.restoreItem(item);
											} 
											restoreInput();
											$scope.$apply();
										}
									}
								}
							};

							$ngBootbox.customDialog(options);
						}
					}
				});
				
				if (!found){
					$scope.toBuy.push(new product($scope.newProductName, $scope.newProductPrice));
					restoreInput();
				}
				
			}
		}

		$scope.buy = function(item) {
			$scope.toBuy.splice($scope.toBuy.indexOf(item), 1);
			item.bought = true;
			$scope.bought.push(item);

		}

		$scope.restoreItem = function(item) {
			$scope.bought.splice($scope.bought.indexOf(item), 1);
			$scope.toBuy.push(item);
			item.bought = false;
			restoreInput();
		}

		$scope.totalPrice = function calculatePrice() {
			var total = 0;
			angular.forEach($scope.toBuy, function(value, key) {
				if (!isNaN(value.price)) {
					total += value.price;
				}

			})
			return Math.round(total * 100) / 100;
		}

		function product(name, price, bought) {
			return {
				name : name,
				price : price,
				bought: bought
			}
		}
		
		function restoreInput(){
			$scope.newProductPrice = '';
			$scope.newProductName = '';
		}
	}
})();
