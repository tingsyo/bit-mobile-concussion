'use strict';

//Setting up route
angular.module('applogs').config(['$stateProvider',
	function($stateProvider) {
		// Applogs state routing
		$stateProvider.
		state('listApplogs', {
			url: '/applogs',
			templateUrl: 'modules/applogs/views/list-applogs.client.view.html'
		}).
		state('createApplog', {
			url: '/applogs/create',
			templateUrl: 'modules/applogs/views/create-applog.client.view.html'
		}).
		state('viewApplog', {
			url: '/applogs/:applogId',
			templateUrl: 'modules/applogs/views/view-applog.client.view.html'
		}).
		state('editApplog', {
			url: '/applogs/:applogId/edit',
			templateUrl: 'modules/applogs/views/edit-applog.client.view.html'
		});
	}
]);