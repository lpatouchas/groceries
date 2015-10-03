(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', '$ngBootbox', '$modal','$timeout', 'GroceriesService', todoCtrl
	]);

	function todoCtrl($scope, $ngBootbox, $modal,$timeout, GroceriesService) {

		$scope.changeLanguage = function(lang) {
			GroceriesService.changeLanguage(lang);
		}

		$scope.products = [];

		$scope.currentSessionPrice = 0;

		GroceriesService.getProducts().then(function(data) {
			$scope.products = data;
		});

		$scope.add = function() {
			GroceriesService.addProduct($scope.newProductName, $scope.newProductPrice, $scope.newProductQuantity, $scope.products);
			restoreInput();
		}

		$scope.update = function(item) {
			GroceriesService.updateProduct(item);
			$scope.closeModal();
		};

		var modalInstance;

		$scope.edit = function(item) {
			$scope.editItem = item;

			modalInstance = $modal.open({
				templateUrl : 'groceries/editModal.html',
				size : 'lg',
				scope : $scope
			});
		};

		$scope.closeModal = function (){
			modalInstance.close();
		}

		$scope.tempItem;
		
		var timer;
		
		$scope.check = function(item, history) {
			GroceriesService.checkProduct(item);
			calcCurrentSessionPrice(item, true);
			restoreInput();
			if (!history){
				handleTempItem(item);
			}
		}

		var handleTempItem = function(item) {
			$scope.tempItem = item;
			$scope.showHistoryAlert = true;
			$timeout.cancel(timer);
	        timer = $timeout(function () { 
	        	$scope.showHistoryAlert = false; 
	        	}, 
	        	3000);  
		}
		
		function calcCurrentSessionPrice(item, checked) {
			var calcPrice = item.price * item.quantity;
			// if currentSessionPrice is 0 and we uncheck an item, do not re-calclulate the currentSessionPrice
			$scope.currentSessionPrice = checked ? $scope.currentSessionPrice + calcPrice
							: $scope.currentSessionPrice != 0 ? $scope.currentSessionPrice - calcPrice : $scope.currentSessionPrice;

			$scope.currentSessionPrice = Math.round($scope.currentSessionPrice * 100) / 100;
		}

		$scope.resetCurrentSessionPrice = function() {
			$scope.currentSessionPrice = 0;
		}
		$scope.tbDeleted;
		$scope.remove = function(item) {
			$scope.tbDeleted = item;
			modalInstance = $modal.open({
				templateUrl : 'groceries/deleteModal.html',
				size : 'lg',
				scope : $scope,
			});
		}
		
		$scope.deleteItem = function(item) {
			GroceriesService.removeProduct($scope.products, item);
			$scope.closeModal();
		}

		$scope.restore = function(item,history) {
			GroceriesService.uncheckProduct(item);
			calcCurrentSessionPrice(item, false);
			restoreInput();
			if (!history){
				handleTempItem(item);
			}
		}

		$scope.totalPrice = function() {
			return GroceriesService.calculateTotalPrice($scope.products);
		}

		function restoreInput() {
			delete $scope.newProductPrice;
			delete $scope.newProductName;
			delete $scope.newProductQuantity;
			delete $scope.tempItem;
		}

		// show hide stuff
		$scope.showNav = false;
		$scope.showHideNav = function() {
			$scope.showNav = !$scope.showNav;
		}

		$scope.getTopPadding = function() {
			if ($scope.currentSessionPrice == 0) {
				return $scope.showNav ? 'openNav' : 'closeNav';
			} else {
				return $scope.showNav ? 'openNavWithInfo' : 'closeNavWithInfo';
			}
		}

		$scope.editId = -1;
		$scope.onshow = function(item) {
			$scope.editId = item.id;
		}
		$scope.onhide = function() {
			$scope.editId = -1;
		}
		
		$scope.showHistoryAlert = false;

		$scope.closeHistoryAlert = function(index) {
		    $scope.showHistoryAlert = false;
		};
		
	}
})();
