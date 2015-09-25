(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', '$ngBootbox', 'DataService', 'ActionsService', todoCtrl
	]);

	function todoCtrl($scope, $ngBootbox, DataService, ActionsService) {
		$scope.products = [];

		DataService.getProducts().$promise.then(function(data) {
			$scope.products = data;
		}, function(error) {
			alertError(error);
		})['finally'](function() {
			//TODO here I should stop the window mask.
		});

		$scope.add = function() {
			ActionsService.add($scope.newProductName, $scope.newProductPrice, $scope.products);
			restoreInput();
		}

		$scope.check = function(item) {
			ActionsService.check(item);
			restoreInput();
		}

		$scope.remove = function(item) {
			ActionsService.remove($scope.products, item);
			restoreInput();
		}

		$scope.restore = function(item) {
			ActionsService.restore(item);
			restoreInput();
		}

		$scope.totalPrice = function() {
			return ActionsService.calculateTotalPrice($scope.products);
		}

		function restoreInput() {
			delete $scope.newProductPrice;
			delete $scope.newProductName;
		}

		function alertError(error) {
			$ngBootbox.alert("Can't load data. <br />Error code: " + error.status + ", " + error.data);
		}
	}
})();
