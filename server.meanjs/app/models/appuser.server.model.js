'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Appuser Schema
 */
var AppuserSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    id: {
        type: String,
        default: '',
				required: '請輸入編號',
				trim: true
    },
    email: {
				type: String,
				default: '',
				required: '請輸入電子郵件，以利通知',
				trim: true
		},
    incidentDate: {
				type: Date,
				required: '請輸入受傷日期',
				default: ''
		},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Appuser', AppuserSchema);
