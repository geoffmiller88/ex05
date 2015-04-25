'use strict';

(function() {
	// Music Controller Spec
	describe('Music Controller Tests', function() {
		// Initialize global variables
		var MusicController,
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

			// Initialize the Music controller.
			MusicController = $controller('MusicController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Music object fetched from XHR', inject(function(Music) {
			// Create sample Music using the Music service
			var sampleMusic = new Music({
				name: 'New Music'
			});

			// Create a sample Music array that includes the new Music
			var sampleMusic = [sampleMusic];

			// Set GET response
			$httpBackend.expectGET('music').respond(sampleMusic);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.music).toEqualData(sampleMusic);
		}));

		it('$scope.findOne() should create an array with one Music object fetched from XHR using a musicId URL parameter', inject(function(Music) {
			// Define a sample Music object
			var sampleMusic = new Music({
				name: 'New Music'
			});

			// Set the URL parameter
			$stateParams.musicId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/music\/([0-9a-fA-F]{24})$/).respond(sampleMusic);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.music).toEqualData(sampleMusic);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Music) {
			// Create a sample Music object
			var sampleMusicPostData = new Music({
				name: 'New Music'
			});

			// Create a sample Music response
			var sampleMusicResponse = new Music({
				_id: '525cf20451979dea2c000001',
				name: 'New Music'
			});

			// Fixture mock form input values
			scope.name = 'New Music';

			// Set POST response
			$httpBackend.expectPOST('music', sampleMusicPostData).respond(sampleMusicResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Music was created
			expect($location.path()).toBe('/music/' + sampleMusicResponse._id);
		}));

		it('$scope.update() should update a valid Music', inject(function(Music) {
			// Define a sample Music put data
			var sampleMusicPutData = new Music({
				_id: '525cf20451979dea2c000001',
				name: 'New Music'
			});

			// Mock Music in scope
			scope.music = sampleMusicPutData;

			// Set PUT response
			$httpBackend.expectPUT(/music\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/music/' + sampleMusicPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid musicId and remove the Music from the scope', inject(function(Music) {
			// Create new Music object
			var sampleMusic = new Music({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Music array and include the Music
			scope.music = [sampleMusic];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/music\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMusic);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.music.length).toBe(0);
		}));
	});
}());