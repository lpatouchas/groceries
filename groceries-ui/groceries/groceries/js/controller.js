(function() {
	'use strict';

	angular.module('groceriesApp').controller('GroceriesAppCtrl', [
		'$scope', '$ngBootbox', 'ActionsService', todoCtrl
	]);

	function todoCtrl($scope, $ngBootbox, ActionsService) {
		$scope.products = [];
		
		$scope.currentSessionPrice = 0;

		ActionsService.get().then(function(data) {
			$scope.products = data;
		});

		$scope.add = function() {
			ActionsService.add($scope.newProductName, $scope.newProductPrice, $scope.products);
			restoreInput();

		}
		
		$scope.update = function (item) {
			ActionsService.add(item.name, item.price, $scope.products);
		};

		$scope.check = function(item) {
			ActionsService.check(item);
			restoreInput();
			$scope.currentSessionPrice += item.price;
			$scope.currentSessionPrice = Math.round($scope.currentSessionPrice * 100) / 100
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

		$scope.editId = -1;
		$scope.onshow = function (item){
			$scope.editId = item.id;
		}
		$scope.onhide = function (){
			$scope.editId = -1;
		}
		
		
		function restoreInput() {
			delete $scope.newProductPrice;
			delete $scope.newProductName;
		}
	}
})();
