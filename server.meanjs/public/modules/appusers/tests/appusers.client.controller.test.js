'use strict';

(function() {
	// Appusers Controller Spec
	describe('Appusers Controller Tests', function() {
		// Initialize global variables
		var AppusersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Appusers controller.
			AppusersController = $controller('AppusersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Appuser object fetched from XHR', inject(function(Appusers) {
			// Create sample Appuser using the Appusers service
			var sampleAppuser = new Appusers({
				name: 'New Appuser'
			});

			// Create a sample Appusers array that includes the new Appuser
			var sampleAppusers = [sampleAppuser];

			// Set GET response
			$httpBackend.expectGET('appusers').respond(sampleAppusers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appusers).toEqualData(sampleAppusers);
		}));

		it('$scope.findOne() should create an array with one Appuser object fetched from XHR using a appuserId URL parameter', inject(function(Appusers) {
			// Define a sample Appuser object
			var sampleAppuser = new Appusers({
				name: 'New Appuser'
			});

			// Set the URL parameter
			$stateParams.appuserId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/appusers\/([0-9a-fA-F]{24})$/).respond(sampleAppuser);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.appuser).toEqualData(sampleAppuser);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Appusers) {
			// Create a sample Appuser object
			var sampleAppuserPostData = new Appusers({
				name: 'New Appuser'
			});

			// Create a sample Appuser response
			var sampleAppuserResponse = new Appusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Appuser'
			});

			// Fixture mock form input values
			scope.name = 'New Appuser';

			// Set POST response
			$httpBackend.expectPOST('appusers', sampleAppuserPostData).respond(sampleAppuserResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Appuser was created
			expect($location.path()).toBe('/appusers/' + sampleAppuserResponse._id);
		}));

		it('$scope.update() should update a valid Appuser', inject(function(Appusers) {
			// Define a sample Appuser put data
			var sampleAppuserPutData = new Appusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Appuser'
			});

			// Mock Appuser in scope
			scope.appuser = sampleAppuserPutData;

			// Set PUT response
			$httpBackend.expectPUT(/appusers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/appusers/' + sampleAppuserPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid appuserId and remove the Appuser from the scope', inject(function(Appusers) {
			// Create new Appuser object
			var sampleAppuser = new Appusers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Appusers array and include the Appuser
			scope.appusers = [sampleAppuser];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/appusers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAppuser);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.appusers.length).toBe(0);
		}));
	});
}());