(function() {
	'use strict';

	angular.module('myApp.todo', [
		'ngRoute','mgcrea.ngStrap', 'myApp.version'
	])

	.config([
		'$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'todo/todo.html',
				controller : 'TodoCtrl'
			});
		}
	]);
})();