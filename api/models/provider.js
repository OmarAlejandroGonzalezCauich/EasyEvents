'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = Schema({
		name: String,
		email: String,
		telephone: String,
		address: String,
		city: String,
		state: String,
		zip: String, 
		img: String,
		product: String,
		description: String,
		price: String
});

module.exports = mongoose.model('Provider', ProviderSchema);