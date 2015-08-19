'use strict';

//Appusers service used to communicate Appusers REST endpoints
angular.module('appusers').factory('Appusers', ['$resource',
	function($resource) {
		return $resource('appusers/:appuserId', { appuserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);