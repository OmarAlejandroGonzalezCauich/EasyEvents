'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Client = require('../models/client');
var Event = require('../models/event');

function prueba(req, res){
		res.status(200).send({
		message: 'Probando una acción del controlador de usuarios del api rest con Node y Mongo'
	});
}

function getClient(req, res){

	var clientId = req.params.id;

	Client.findById(clientId, (err, client) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!client){
				res.status(404).send({message: 'El cliente no existe'});
			}else{
				res.status(200).send({client});
			}
		}
	});
}

function getClients(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Client.find().sort('name').paginate(page, itemsPerPage, function(err, clients, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!clients){
				res.status(404).send({message: 'No hay compañias !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					clients: clients
				});
			}
		}
	});
}


function saveClient(req, res){
	var client = new Client();

	var params = req.body;

	client.name = params.name;
	client.surnaname = params.surnaname;
	client.email  = params.email;
	client.telephone = params.telephone;
	client.img = null;
	client.business_name = params.business_name;

	client.save((err, clientStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!clientStored){
				res.status(404).send({message: 'No se ha guardado la canción'});
			}else{
				res.status(200).send({client: clientStored});
			}
		}
	});
}

function updateClient(req, res){
	var clientId = req.params.id;
	var update = req.body;

	Client.findByIdAndUpdate(clientId, update, (err, clientUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar al proveedor'});
		}else{
			if(!clientUpdated){
				res.status(404).send({message: 'El proveedor no ha sido actualizado'});
			}else{
				res.status(200).send({client: clientUpdated});
			}
		}
	});
}

function deleteClient(req, res){
	var clientId = req.params.id; 

	Client.findByIdAndRemove(clientId, (err, clientRemoved)=>{
		if(err){
			res.status(500).send({message: 'Error al eliminar al cliente'});
		}else{
			if(!clientRemoved){
				res.status(404).send({message: 'El cliente no ha sido eliminado'});
			}else{

				Event.find({client: clientRemoved._id}).remove((err, eventRemoved)=>{
					if(err){
						res.status(500).send({message: 'Error al eliminar el evento'});
					}else{
						if(!eventRemoved){
							res.status(404).send({message: 'El evento no ha sido eliminada'});
						}else{
							res.status(200).send({client: clientRemoved});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var clientId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.img.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF'){

			Client.findByIdAndUpdate(clientId, {image: file_name}, (err, clientUpdated) => {
				if(!clientId){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({client: clientUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/clients/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	prueba,
	getClient,
	getClients,
	saveClient,
	updateClient,
	deleteClient,
	uploadImage,
	getImageFile
	
};