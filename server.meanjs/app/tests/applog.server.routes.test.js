'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Applog = mongoose.model('Applog'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, applog;

/**
 * Applog routes tests
 */
describe('Applog CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Applog
		user.save(function() {
			applog = {
				name: 'Applog Name'
			};

			done();
		});
	});

	it('should be able to save Applog instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Applog
				agent.post('/applogs')
					.send(applog)
					.expect(200)
					.end(function(applogSaveErr, applogSaveRes) {
						// Handle Applog save error
						if (applogSaveErr) done(applogSaveErr);

						// Get a list of Applogs
						agent.get('/applogs')
							.end(function(applogsGetErr, applogsGetRes) {
								// Handle Applog save error
								if (applogsGetErr) done(applogsGetErr);

								// Get Applogs list
								var applogs = applogsGetRes.body;

								// Set assertions
								(applogs[0].user._id).should.equal(userId);
								(applogs[0].name).should.match('Applog Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Applog instance if not logged in', function(done) {
		agent.post('/applogs')
			.send(applog)
			.expect(401)
			.end(function(applogSaveErr, applogSaveRes) {
				// Call the assertion callback
				done(applogSaveErr);
			});
	});

	it('should not be able to save Applog instance if no name is provided', function(done) {
		// Invalidate name field
		applog.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Applog
				agent.post('/applogs')
					.send(applog)
					.expect(400)
					.end(function(applogSaveErr, applogSaveRes) {
						// Set message assertion
						(applogSaveRes.body.message).should.match('Please fill Applog name');
						
						// Handle Applog save error
						done(applogSaveErr);
					});
			});
	});

	it('should be able to update Applog instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Applog
				agent.post('/applogs')
					.send(applog)
					.expect(200)
					.end(function(applogSaveErr, applogSaveRes) {
						// Handle Applog save error
						if (applogSaveErr) done(applogSaveErr);

						// Update Applog name
						applog.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Applog
						agent.put('/applogs/' + applogSaveRes.body._id)
							.send(applog)
							.expect(200)
							.end(function(applogUpdateErr, applogUpdateRes) {
								// Handle Applog update error
								if (applogUpdateErr) done(applogUpdateErr);

								// Set assertions
								(applogUpdateRes.body._id).should.equal(applogSaveRes.body._id);
								(applogUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Applogs if not signed in', function(done) {
		// Create new Applog model instance
		var applogObj = new Applog(applog);

		// Save the Applog
		applogObj.save(function() {
			// Request Applogs
			request(app).get('/applogs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Applog if not signed in', function(done) {
		// Create new Applog model instance
		var applogObj = new Applog(applog);

		// Save the Applog
		applogObj.save(function() {
			request(app).get('/applogs/' + applogObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', applog.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Applog instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Applog
				agent.post('/applogs')
					.send(applog)
					.expect(200)
					.end(function(applogSaveErr, applogSaveRes) {
						// Handle Applog save error
						if (applogSaveErr) done(applogSaveErr);

						// Delete existing Applog
						agent.delete('/applogs/' + applogSaveRes.body._id)
							.send(applog)
							.expect(200)
							.end(function(applogDeleteErr, applogDeleteRes) {
								// Handle Applog error error
								if (applogDeleteErr) done(applogDeleteErr);

								// Set assertions
								(applogDeleteRes.body._id).should.equal(applogSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Applog instance if not signed in', function(done) {
		// Set Applog user 
		applog.user = user;

		// Create new Applog model instance
		var applogObj = new Applog(applog);

		// Save the Applog
		applogObj.save(function() {
			// Try deleting Applog
			request(app).delete('/applogs/' + applogObj._id)
			.expect(401)
			.end(function(applogDeleteErr, applogDeleteRes) {
				// Set message assertion
				(applogDeleteRes.body.message).should.match('User is not logged in');

				// Handle Applog error error
				done(applogDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Applog.remove().exec();
		done();
	});
});