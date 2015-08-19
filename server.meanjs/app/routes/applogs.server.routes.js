'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var applogs = require('../../app/controllers/applogs.server.controller');

	// Applogs Routes
	app.route('/applogs')
		.get(applogs.list)
		//.post(users.requiresLogin, applogs.create);
		.post(applogs.create);

	app.route('/applogs/:applogId')
		.get(applogs.read)
		.put(users.requiresLogin, applogs.hasAuthorization, applogs.update)
		.delete(users.requiresLogin, applogs.hasAuthorization, applogs.delete);

	// Finish by binding the Applog middleware
	app.param('applogId', applogs.applogByID);
};
