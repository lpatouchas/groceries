'use strict';

angular.module('myApp.todo', ['ngRoute', 'myApp.version'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'todo/todo.html',
    controller: 'TodoCtrl'
  });
}])

.controller('TodoCtrl', ['$scope', '$routeParams',function($scope) {
	$scope.hello = "what the fuck";
	
	$scope.toBuy = [product('apples',parseFloat('1.5')), product('oragnes',parseFloat('2')), product('mellon',parseFloat('3'))];
	
	$scope.bought = [];
	
	$scope.buy = function(item){
		$scope.toBuy.splice($scope.toBuy.indexOf(item),1);
		$scope.bought.push(item);
		
	}
	
	$scope.restoreItem = function(item){
		$scope.bought.splice($scope.bought.indexOf(item),1);
		$scope.toBuy.push(item);
		
	}
	
	$scope.add = function(){
		var name = $scope.newItem[0];
		var s = $scope.newItem[1];
		var price = parseFloat(s);
		if ($scope.newItem){
			$scope.toBuy.push(new product(name,price));
			$scope.newItem = "";
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
}]);