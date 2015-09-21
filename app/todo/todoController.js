(function() {
	'use strict';
	
	angular.module('myApp.todo').controller('TodoCtrl', [
         	'$scope', '$routeParams', todoCtrl]);
	
	 function todoCtrl($scope) {
  		$scope.hello = "what the fuck";
  		
  		$scope.toBuy = [
  			product('apples', parseFloat('1.5')), product('oragnes', parseFloat('2')), product('mellon', parseFloat('3'))
  		];

  		$scope.bought = [product('cucumbers', parseFloat('1.5'))];

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
  			var a = $scope.newItem.name;
  			if (a){
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

  		$scope.totalPrice = function calculatePrice() {
  			var total = 0;
  			angular.forEach($scope.toBuy, function(value, key) {
  				total += value.price;
  			})
  			return total;
  		}

  		function product(name, price) {
  			return {
  				name : name,
  				price : price
  			}
  		}
  		
  		$scope.selectedState = "";
  		 $scope.states = [product('apples', parseFloat('1.5'))];
  		
  	}
})();
