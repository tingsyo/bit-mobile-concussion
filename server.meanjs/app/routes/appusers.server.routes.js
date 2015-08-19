'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var appusers = require('../../app/controllers/appusers.server.controller');

	// Appusers Routes
	app.route('/appusers')
		.get(appusers.list)
		.post(users.requiresLogin, appusers.create);

	app.route('/appusers/:appuserId')
		.get(appusers.read)
		.put(users.requiresLogin, appusers.hasAuthorization, appusers.update)
		.delete(users.requiresLogin, appusers.hasAuthorization, appusers.delete);

	// Finish by binding the Appuser middleware
	app.param('appuserId', appusers.appuserByID);
};
