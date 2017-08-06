'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserClientsSchema = Schema({
		name: String,
		surname: String,
		email: String,
		telephone: String,
		img: String,
		business_name: String
});

module.exports = mongoose.model('Client', UserClientsSchema);