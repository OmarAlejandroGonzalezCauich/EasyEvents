'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = Schema({
		name: String,
		email: String,
		telephone: String,
		address: String,
		city: String,
		state: String,
		zip: String,
		img: String,
		website: String
		
});

module.exports = mongoose.model('Companies', CompanySchema);