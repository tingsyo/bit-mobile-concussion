'use strict';

//Applogs service used to communicate Applogs REST endpoints
angular.module('applogs').factory('Applogs', ['$resource',
	function($resource) {
		return $resource('applogs/:applogId', { applogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);