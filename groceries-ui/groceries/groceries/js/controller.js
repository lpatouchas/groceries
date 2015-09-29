(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', '$ngBootbox', 'GroceriesService', todoCtrl
	]);

	function todoCtrl($scope, $ngBootbox, GroceriesService) {
		$scope.products = [];
		
		$scope.currentSessionPrice = 0;

		GroceriesService.getProducts().then(function(data) {
			$scope.products = data;
		});

		$scope.add = function() {
			GroceriesService.addProduct($scope.newProductName, $scope.newProductPrice, $scope.newProductQuantity, $scope.products);
			restoreInput();
		}
		
		$scope.update = function (item) {
			GroceriesService.updateProduct(item);
		};

		$scope.check = function (item) {
			GroceriesService.checkProduct(item);
			restoreInput();
			calcCurrentSessionPrice(item,true);
		}

		
		function calcCurrentSessionPrice (item, checked){
			var calcPrice = item.price * item.quantity;
			//if currentSessionPrice is 0 and we uncheck an item, do not re-calclulate the currentSessionPrice
			$scope.currentSessionPrice = checked ? $scope.currentSessionPrice + calcPrice : 
				$scope.currentSessionPrice != 0 ?$scope.currentSessionPrice - calcPrice : $scope.currentSessionPrice;
			
			$scope.currentSessionPrice = Math.round($scope.currentSessionPrice * 100) / 100;
		}
		
		$scope.remove = function(item) {
			GroceriesService.removeProduct($scope.products, item);
			restoreInput();
		}

		$scope.restore = function(item) {
			GroceriesService.uncheckProduct(item);
			calcCurrentSessionPrice(item,false);
			restoreInput();
		}

		$scope.totalPrice = function() {
			return GroceriesService.calculateTotalPrice($scope.products);
		}

		
		function restoreInput() {
			delete $scope.newProductPrice;
			delete $scope.newProductName;
			delete $scope.newProductQuantity;
		}
		
		//show hide stuff
		$scope.showNav = false;
		$scope.showHideNav = function () {
			$scope.showNav = !$scope.showNav;
		}
		
		$scope.getTopPadding = function () {
			return $scope.showNav ? 'openNav' : 'closeNav';
		}
		
		$scope.editId = -1;
		$scope.onshow = function (item){
			$scope.editId = item.id;
		}
		$scope.onhide = function (){
			$scope.editId = -1;
		}
	}
})();
