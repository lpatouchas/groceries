(function() {
	'use strict';

	angular.module('myApp.todo', [
		'ngRoute','mgcrea.ngStrap', 'myApp.version','xeditable','ngResource','ngBootbox'
	])

	.config([
		'$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'todo/todo.html',
				controller : 'TodoCtrl'
			});
		}
	]);
	
	angular.module('myApp.todo').run(function(editableOptions) {
		  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
})();