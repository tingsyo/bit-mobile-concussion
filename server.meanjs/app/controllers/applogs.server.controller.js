'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Applog = mongoose.model('Applog'),
	_ = require('lodash');

/**
 * Create a Applog
 */
exports.create = function(req, res) {
	var applog = new Applog(req.body);
	//applog.user = req.user;

	applog.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			//console.log("applog inserted: "+applog);
			return res.status(200).jsonp(applog);
		}
	});
};

/**
 * Show the current Applog
 */
exports.read = function(req, res) {
	res.jsonp(req.applog);
};

/**
 * Update a Applog
 */
exports.update = function(req, res) {
	var applog = req.applog ;

	applog = _.extend(applog , req.body);

	applog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(applog);
		}
	});
};

/**
 * Delete an Applog
 */
exports.delete = function(req, res) {
	var applog = req.applog ;

	applog.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(applog);
		}
	});
};

/**
 * List of Applogs
 */
exports.list = function(req, res) {
	Applog.find().sort('-created').populate('user', 'displayName').exec(function(err, applogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(applogs);
		}
	});
};

/**
 * Applog middleware
 */
exports.applogByID = function(req, res, next, id) {
	Applog.findById(id).populate('user', 'displayName').exec(function(err, applog) {
		if (err) return next(err);
		if (! applog) return next(new Error('Failed to load Applog ' + id));
		req.applog = applog ;
		next();
	});
};

/**
 * Applog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.applog.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

// For options
exports.test = function(req, res, next){
	return res.status(200).send("options work");
	next();
}
