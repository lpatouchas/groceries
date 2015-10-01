(function() {
	'use strict';

	angular.module('groceriesApp', [
		'ngRoute', 'myApp.version', 'xeditable', 'ngResource', 'ngBootbox', //
		'ngAnimate', 'blockUI', 'ngTouch', 'ngLocalize', 'ngLocalize.Config',
		'ngLocalize.InstalledLanguages'
	])

	.value('localeConf', {
		basePath : 'groceries/languages',
		defaultLocale : 'el-GR',//
		sharedDictionary : 'common',
		fileExtension : '.lang.json',
		persistSelection : true,
		cookieName : 'COOKIE_LOCALE_LANG',
		observableAttrs : new RegExp('^data-(?!ng-|i18n)'),
		delimiter : '::'
	})

	.value('localeSupported', [
		'el-GR',
		'en-US'
	]).value('localeFallbacks', {
		'el' : 'el-GR'
	})

	.config([
		'$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'groceries/groceries.html',
				controller : 'GroceriesAppCtrl'
			}).otherwise({
				redirectTo : 'groceries/groceries.html'
			});
			;
		}
	]);

	angular.module('groceriesApp').run(function(editableOptions,locale) {
			editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
			locale.ready('common').then(function () {
				locale.setLocale('el-GR');
			});
		});
})();