'use strict';

(function() {
	// Applogs Controller Spec
	describe('Applogs Controller Tests', function() {
		// Initialize global variables
		var ApplogsController,
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

			// Initialize the Applogs controller.
			ApplogsController = $controller('ApplogsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Applog object fetched from XHR', inject(function(Applogs) {
			// Create sample Applog using the Applogs service
			var sampleApplog = new Applogs({
				name: 'New Applog'
			});

			// Create a sample Applogs array that includes the new Applog
			var sampleApplogs = [sampleApplog];

			// Set GET response
			$httpBackend.expectGET('applogs').respond(sampleApplogs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.applogs).toEqualData(sampleApplogs);
		}));

		it('$scope.findOne() should create an array with one Applog object fetched from XHR using a applogId URL parameter', inject(function(Applogs) {
			// Define a sample Applog object
			var sampleApplog = new Applogs({
				name: 'New Applog'
			});

			// Set the URL parameter
			$stateParams.applogId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/applogs\/([0-9a-fA-F]{24})$/).respond(sampleApplog);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.applog).toEqualData(sampleApplog);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Applogs) {
			// Create a sample Applog object
			var sampleApplogPostData = new Applogs({
				name: 'New Applog'
			});

			// Create a sample Applog response
			var sampleApplogResponse = new Applogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Applog'
			});

			// Fixture mock form input values
			scope.name = 'New Applog';

			// Set POST response
			$httpBackend.expectPOST('applogs', sampleApplogPostData).respond(sampleApplogResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Applog was created
			expect($location.path()).toBe('/applogs/' + sampleApplogResponse._id);
		}));

		it('$scope.update() should update a valid Applog', inject(function(Applogs) {
			// Define a sample Applog put data
			var sampleApplogPutData = new Applogs({
				_id: '525cf20451979dea2c000001',
				name: 'New Applog'
			});

			// Mock Applog in scope
			scope.applog = sampleApplogPutData;

			// Set PUT response
			$httpBackend.expectPUT(/applogs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/applogs/' + sampleApplogPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid applogId and remove the Applog from the scope', inject(function(Applogs) {
			// Create new Applog object
			var sampleApplog = new Applogs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Applogs array and include the Applog
			scope.applogs = [sampleApplog];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/applogs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleApplog);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.applogs.length).toBe(0);
		}));
	});
}());