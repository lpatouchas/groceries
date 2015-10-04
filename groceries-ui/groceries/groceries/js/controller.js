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

		$scope.edit = function(item) {
			$scope.editItem = item;
			showEditModal();
		};

		$scope.tempItem;
		
		$scope.check = function(item, history) {
			GroceriesService.checkProduct(item);
			restoreInput();
			calcCurrentSessionPrice(item, true);
			if (!history){
				handleTempItem(item);
			}
		}
		
		$scope.restore = function(item,history) {
			GroceriesService.uncheckProduct(item);
			restoreInput();
			calcCurrentSessionPrice(item, false);
			if (!history){
				handleTempItem(item);
			}
		}

		function calcCurrentSessionPrice(item, checked, history) {
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
			showRemoveModal();
		}
		
		$scope.deleteItem = function(item) {
			GroceriesService.removeProduct($scope.products, item);
			$scope.closeModal();
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

		/// modal stuff
		var modalInstance;
		
		function showEditModal(){
			modalInstance = $modal.open({
				templateUrl : 'groceries/editModal.html',
				size : 'lg',
				scope : $scope
			});
		}
		
		function showRemoveModal(){
			modalInstance = $modal.open({
				templateUrl : 'groceries/deleteModal.html',
				size : 'lg',
				scope : $scope,
			});
		}
		
		$scope.closeModal = function (){
			modalInstance.close();
		}
		///// Alert timer stuff
		var timer;
		$scope.showHistoryAlert = false;
		var handleTempItem = function(item) {
			$scope.tempItem = item;
			$scope.showHistoryAlert = true;
			$timeout.cancel(timer);
	        timer = $timeout(function () { 
	        	$scope.showHistoryAlert = false; 
	        	}, 
	        	3000);  
		}
		////// show hide stuff
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

	}
})();
