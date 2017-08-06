'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
		name: String,
		surname: String,
		email: String,
		password: String,
		state: String,
		city: String,
		address: String,
		telephone: String,
		rfc: String,
		zip: String,
		img: String
});

module.exports = mongoose.model('User', UserSchema);