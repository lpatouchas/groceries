(function() {
	'use strict';

	angular.module('groceriesApp', [
		'ngRoute','mgcrea.ngStrap', 'myApp.version','xeditable','ngResource','ngBootbox','ngAnimate'
	])

	.config([
		'$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'groceries/groceries.html',
				controller : 'GroceriesAppCtrl'
			});
		}
	]);
	
	angular.module('groceriesApp').run(function(editableOptions) {
		  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
})();