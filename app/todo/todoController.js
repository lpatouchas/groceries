(function() {
	'use strict';

	angular.module('myApp.todo').controller('TodoCtrl', [
		'$scope', '$routeParams', '$http', 'DataService', todoCtrl
	]);

	function todoCtrl($scope, $routeParams, $http, DataService) {

		$scope.toBuy = DataService.getData();
		
		$scope.bought = [
			product('cucumbers', parseFloat('1.5'))
		];

		$scope.buy = function(item) {
			$scope.toBuy.splice($scope.toBuy.indexOf(item), 1);
			$scope.bought.push(item);

		}

		$scope.restoreItem = function(item) {
			$scope.bought.splice($scope.bought.indexOf(item), 1);
			$scope.toBuy.push(item);
		}

		$scope.add2 = function(something) {
			console.log(something);
		}

		$scope.add = function() {
			if ($scope.newItem != '' && $scope.newItem != 'undefined') {

				//mobile fix
				angular.forEach($scope.bought, function(item, index) {
					if (item.name == $scope.newItem) {
						$scope.newItem = item;
					}
				})

				if ($scope.newItem.name) {
					$scope.bought.splice($scope.bought.indexOf($scope.newItem), 1);
					$scope.toBuy.push($scope.newItem);
					$scope.newItem = "";
				} else {
					var newProduct = $scope.newItem.split(",")
					var name = newProduct[0];
					var s = newProduct[1];
					var price = parseFloat(s);
					if (newProduct) {
						$scope.toBuy.push(new product(name, price));
						$scope.newItem = "";
					}
				}
			}
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

		function product(name, price) {
			return {
				name : name,
				price : price
			}
		}

	}
})();
