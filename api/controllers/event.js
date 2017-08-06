'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Event = require('../models/event');


function getEvent(req, res){
	var eventId = req.params.id;

	Event.findById(eventId).populate({path: 'client'}).exec((err, event)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!event){
				res.status(404).send({message: 'El evento no existe.'});
			}else{
				res.status(200).send({event});
			}
		}
	});
}

function getEvents(req, res){
	var clientId = req.params.client;

	if(!clientId){
		// Sacar todos los eventOs de la bbdd
		var find = Event.find({}).sort('date');
	}else{
		// Sacar los eventOs de un clientE concreto de la bbdd
		var find = Event.find({client: clientId}).sort('description');
	}

	find.populate({path: 'client'}).exec((err, events) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!events){
				res.status(404).send({message: 'No hay eventOs'});
			}else{
				res.status(200).send({events});
			}
		}
	});
}


function saveEvent(req, res){
	var event = new Event();

	var params = req.body;

	event.event_type = params.event_type;
	event.date = params.date;
	event.method_payment = params.method_payment; 
	event.time_lapse = params.time_lapse;
	event.quantity = params.quantity;
	event.extras = params.extras;
	event.description = params.description;
	event.discount = params.discount;
	event.client = params.client;

	if(event.event_type != null &&
		event.date != null && 
		event.method_payment != null &&
		event.time_lapse != null &&
		event.quantity != null &&
		event.extras  != null && 
		event.description != null &&
		event.discount != null){
				// Guardar el evente
		event.save((err, eventStored) => {
			if(err){
				res.status(500).send({message: 'Error al guardar el evento'});
			}else{
				if(!eventStored){
					res.status(404).send({message: 'No se ha registrado el evento'});
				}else{
					res.status(200).send({event: eventStored});
				}
			}
		});

	}else{
			  res.status(200).send({message: 'Rellena todos los campos'});
	}
}

function updateEvent(req, res){
	var eventId = req.params.id;
	var update = req.body;

	Event.findByIdAndUpdate(eventId, update, (err, eventUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el evento'});
		}else{
			if(!eventUpdated){
				res.status(404).send({message: 'El evento no ha sido actualizado'});
			}else{
				res.status(200).send({event: eventUpdated});
			}
		}
	});
}

function deleteEvent(req, res){
	var eventId = req.params.id;
	
	Event.findByIdAndRemove(eventId, (err, eventRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!eventRemoved){
				res.status(404).send({message: 'No se ha borrado el evento'});
			}else{
				res.status(200).send({event: eventRemoved});
			}
		}
	});
}


module.exports = {
	getEvent,
	getEvents,
	saveEvent,
	updateEvent,
	deleteEvent
};