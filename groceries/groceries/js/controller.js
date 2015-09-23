(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', 'DataService', 'ActionsService', todoCtrl
	]);

	function todoCtrl($scope, DataService, ActionsService) {

		$scope.toBuy = DataService.toBuy.getData();

		$scope.bought = DataService.bought.getData();

		$scope.add = function() {
			ActionsService.add($scope.newProductName, $scope.newProductPrice, $scope.toBuy, $scope.bought, $scope);
			restoreInput();
		}

		$scope.buy = function(item) {
			ActionsService.buy($scope.toBuy, $scope.bought, item);
			restoreInput();
		}

		$scope.remove = function(item) {
			ActionsService.remove($scope.bought, item);
			restoreInput();
		}

		$scope.restore = function(item) {
			ActionsService.restore($scope.toBuy, $scope.bought, item);
			restoreInput();
		}

		$scope.totalPrice = function() {
			return ActionsService.calculateTotalPrice($scope.toBuy);
		}

		function restoreInput() {
			delete $scope.newProductPrice;
			delete $scope.newProductName;
		}
	}
})();
