'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Appuser = mongoose.model('Appuser'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, appuser;

/**
 * Appuser routes tests
 */
describe('Appuser CRUD tests', function() {
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

		// Save a user to the test db and create new Appuser
		user.save(function() {
			appuser = {
				name: 'Appuser Name'
			};

			done();
		});
	});

	it('should be able to save Appuser instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appuser
				agent.post('/appusers')
					.send(appuser)
					.expect(200)
					.end(function(appuserSaveErr, appuserSaveRes) {
						// Handle Appuser save error
						if (appuserSaveErr) done(appuserSaveErr);

						// Get a list of Appusers
						agent.get('/appusers')
							.end(function(appusersGetErr, appusersGetRes) {
								// Handle Appuser save error
								if (appusersGetErr) done(appusersGetErr);

								// Get Appusers list
								var appusers = appusersGetRes.body;

								// Set assertions
								(appusers[0].user._id).should.equal(userId);
								(appusers[0].name).should.match('Appuser Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Appuser instance if not logged in', function(done) {
		agent.post('/appusers')
			.send(appuser)
			.expect(401)
			.end(function(appuserSaveErr, appuserSaveRes) {
				// Call the assertion callback
				done(appuserSaveErr);
			});
	});

	it('should not be able to save Appuser instance if no name is provided', function(done) {
		// Invalidate name field
		appuser.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appuser
				agent.post('/appusers')
					.send(appuser)
					.expect(400)
					.end(function(appuserSaveErr, appuserSaveRes) {
						// Set message assertion
						(appuserSaveRes.body.message).should.match('Please fill Appuser name');
						
						// Handle Appuser save error
						done(appuserSaveErr);
					});
			});
	});

	it('should be able to update Appuser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appuser
				agent.post('/appusers')
					.send(appuser)
					.expect(200)
					.end(function(appuserSaveErr, appuserSaveRes) {
						// Handle Appuser save error
						if (appuserSaveErr) done(appuserSaveErr);

						// Update Appuser name
						appuser.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Appuser
						agent.put('/appusers/' + appuserSaveRes.body._id)
							.send(appuser)
							.expect(200)
							.end(function(appuserUpdateErr, appuserUpdateRes) {
								// Handle Appuser update error
								if (appuserUpdateErr) done(appuserUpdateErr);

								// Set assertions
								(appuserUpdateRes.body._id).should.equal(appuserSaveRes.body._id);
								(appuserUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Appusers if not signed in', function(done) {
		// Create new Appuser model instance
		var appuserObj = new Appuser(appuser);

		// Save the Appuser
		appuserObj.save(function() {
			// Request Appusers
			request(app).get('/appusers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Appuser if not signed in', function(done) {
		// Create new Appuser model instance
		var appuserObj = new Appuser(appuser);

		// Save the Appuser
		appuserObj.save(function() {
			request(app).get('/appusers/' + appuserObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', appuser.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Appuser instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Appuser
				agent.post('/appusers')
					.send(appuser)
					.expect(200)
					.end(function(appuserSaveErr, appuserSaveRes) {
						// Handle Appuser save error
						if (appuserSaveErr) done(appuserSaveErr);

						// Delete existing Appuser
						agent.delete('/appusers/' + appuserSaveRes.body._id)
							.send(appuser)
							.expect(200)
							.end(function(appuserDeleteErr, appuserDeleteRes) {
								// Handle Appuser error error
								if (appuserDeleteErr) done(appuserDeleteErr);

								// Set assertions
								(appuserDeleteRes.body._id).should.equal(appuserSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Appuser instance if not signed in', function(done) {
		// Set Appuser user 
		appuser.user = user;

		// Create new Appuser model instance
		var appuserObj = new Appuser(appuser);

		// Save the Appuser
		appuserObj.save(function() {
			// Try deleting Appuser
			request(app).delete('/appusers/' + appuserObj._id)
			.expect(401)
			.end(function(appuserDeleteErr, appuserDeleteRes) {
				// Set message assertion
				(appuserDeleteRes.body.message).should.match('User is not logged in');

				// Handle Appuser error error
				done(appuserDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Appuser.remove().exec();
		done();
	});
});