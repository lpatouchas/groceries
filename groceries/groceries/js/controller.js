(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', '$ngBootbox', 'ActionsService', todoCtrl
	]);

	function todoCtrl($scope, $ngBootbox, ActionsService) {
		$scope.products = [];

		ActionsService.get().then(function(data) {
			$scope.products = data;
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
	}
})();
