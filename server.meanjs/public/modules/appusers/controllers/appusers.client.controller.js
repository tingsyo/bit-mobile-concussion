'use strict';

// Appusers controller
angular.module('appusers').controller('AppusersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Appusers',
	function($scope, $stateParams, $location, Authentication, Appusers) {
		$scope.authentication = Authentication;

		// Create new Appuser
		$scope.create = function() {
			// Create new Appuser object
			var appuser = new Appusers ({
                id: this.id,
				name: this.name,
                gender: this.gender,
                birthDate: this.birthDate,
                incidentDate: this.incidentDate,
                email: this.email,
                phone: this.phone
			});

			// Redirect after save
			appuser.$save(function(response) {
				$location.path('appusers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Appuser
		$scope.remove = function(appuser) {
			if ( appuser ) { 
				appuser.$remove();

				for (var i in $scope.appusers) {
					if ($scope.appusers [i] === appuser) {
						$scope.appusers.splice(i, 1);
					}
				}
			} else {
				$scope.appuser.$remove(function() {
					$location.path('appusers');
				});
			}
		};

		// Update existing Appuser
		$scope.update = function() {
			var appuser = $scope.appuser;

			appuser.$update(function() {
				$location.path('appusers/' + appuser._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Appusers
		$scope.find = function() {
			$scope.appusers = Appusers.query();
		};

		// Find existing Appuser
		$scope.findOne = function() {
			$scope.appuser = Appusers.get({ 
				appuserId: $stateParams.appuserId
			});
		};
	}
]);