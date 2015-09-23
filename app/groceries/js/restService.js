(function() {
	'use strict';
	angular.module('groceriesApp').factory('DataService', [
		'$resource', function($resource) {

			return {
				toBuy : $resource('groceries/data/toBuy.json', {}, {
					getData : {
						method : 'GET',
						params : {},
						isArray : true
					}
				}),

				bought : $resource('groceries/data/bought.json', {}, {
					getData : {
						method : 'GET',
						params : {},
						isArray : true
					}
				})
			};
		}
	]);
})();