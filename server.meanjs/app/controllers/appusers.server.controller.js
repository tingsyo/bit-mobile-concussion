'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Appuser = mongoose.model('Appuser'),
	_ = require('lodash');

/**
 * Create a Appuser
 */
exports.create = function(req, res) {
	var appuser = new Appuser(req.body);
	appuser.user = req.user;

	appuser.save(function(err) {
		if (err) {
            console.log(errorHandler.getErrorMessage(err));
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appuser);
		}
	});
};

/**
 * Show the current Appuser
 */
exports.read = function(req, res) {
	res.jsonp(req.appuser);
};

/**
 * Update a Appuser
 */
exports.update = function(req, res) {
	var appuser = req.appuser ;

	appuser = _.extend(appuser , req.body);

	appuser.save(function(err) {
		if (err) {
            console.log(errorHandler.getErrorMessage(err));
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appuser);
		}
	});
};

/**
 * Delete an Appuser
 */
exports.delete = function(req, res) {
	var appuser = req.appuser ;

	appuser.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appuser);
		}
	});
};

/**
 * List of Appusers
 */
exports.list = function(req, res) { 
	Appuser.find().sort('-created').populate('user', 'displayName').exec(function(err, appusers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(appusers);
		}
	});
};

/**
 * Appuser middleware
 */
exports.appuserByID = function(req, res, next, id) { 
	Appuser.findById(id).populate('user', 'displayName').exec(function(err, appuser) {
		if (err) return next(err);
		if (! appuser) return next(new Error('Failed to load Appuser ' + id));
		req.appuser = appuser ;
		next();
	});
};

/**
 * Appuser authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.appuser.user.id !== req.user.id) {
//		return res.status(403).send('User is not authorized');
//	}
	next();
};
