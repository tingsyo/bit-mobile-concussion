'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Applog Schema
 */
var ApplogSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	time: Date,
	overall: String,
	symptoms: [String],
	userid: String
});

mongoose.model('Applog', ApplogSchema);
