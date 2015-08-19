'use strict';

//Setting up route
angular.module('appusers').config(['$stateProvider',
	function($stateProvider) {
		// Appusers state routing
		$stateProvider.
		state('listAppusers', {
			url: '/appusers',
			templateUrl: 'modules/appusers/views/list-appusers.client.view.html'
		}).
		state('createAppuser', {
			url: '/appusers/create',
			templateUrl: 'modules/appusers/views/create-appuser.client.view.html'
		}).
		state('viewAppuser', {
			url: '/appusers/:appuserId',
			templateUrl: 'modules/appusers/views/view-appuser.client.view.html'
		}).
		state('editAppuser', {
			url: '/appusers/:appuserId/edit',
			templateUrl: 'modules/appusers/views/edit-appuser.client.view.html'
		});
	}
]);