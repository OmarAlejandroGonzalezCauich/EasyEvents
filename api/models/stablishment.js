'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StablishmentSchema = Schema({
		name: String,
		email: String,
		telephone: String,
		address: String,
		city: String,
		state: String,
		zip: String,
		img: String,
		services: String,
		description: String,
		price: String
		
});

module.exports = mongoose.model('Stablishment', StablishmentSchema);