(function() {
	'use strict';

	angular.module('groceriesApp', [
		'ngRoute', 'myApp.version','xeditable','ngResource','ngBootbox','ngAnimate','blockUI','ngTouch'
	])

	.config([
		'$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'groceries/groceries.html',
				controller : 'GroceriesAppCtrl'
			}).otherwise({ redirectTo: 'groceries/groceries.html' });;
		}
	]);
	
	angular.module('groceriesApp').run(function(editableOptions) {
		  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
})();