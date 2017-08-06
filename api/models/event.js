'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = Schema({
		event_type: String,
		date: Date,
		method_payment: String,
		time_lapse: String, 
		quantity: String,
		extras: String, 
		description: String,
		discount: String,
		client: { type: Schema.ObjectId, ref: 'Client'}

});

module.exports = mongoose.model('Event', EventsSchema);
