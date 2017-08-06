'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Stablishment = require('../models/stablishment');

function getStablishment(req, res){

	var stablishmentId = req.params.id;

	Stablishment.findById(stablishmentId, (err, stablishment) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!stablishment){
				res.status(404).send({message: 'El establecimiento no existe'});
			}else{
				res.status(200).send({stablishment});
			}
		}
	});
}

function getStablishments(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Stablishment.find().sort('name').paginate(page, itemsPerPage, function(err, stablishments, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!stablishments){
				res.status(404).send({message: 'No hay establecimientos !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					stablishments: stablishments
				});
			}
		}
	});
}


function saveStablishment(req, res){
	var stablishment = new Stablishment();

	var params = req.body;
	stablishment.name = params.name;
	stablishment.email  = params.email;
	stablishment.telephone = params.telephone;
	stablishment.address = params.address;
	stablishment.city = params.city;
	stablishment.state = params.state;
	stablishment.zip = params.zip;
	stablishment.img = params.img;
	stablishment.services = params.services;
	stablishment.description = params.description;
	stablishment.price = params.price;

	stablishment.save((err, stablishmentStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!stablishmentStored){
				res.status(404).send({message: 'No se ha guardado la canción'});
			}else{
				res.status(200).send({stablishment: stablishmentStored});
			}
		}
	});
}

function updateStablishment(req, res){
	var stablishmentId = req.params.id;
	var update = req.body;

	Stablishment.findByIdAndUpdate(stablishmentId, update, (err, stablishmentUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el establecimiento'});
		}else{
			if(!stablishmentUpdated){
				res.status(404).send({message: 'El establecimiento no ha sido actualizado'});
			}else{
				res.status(200).send({stablishment: stablishmentUpdated});
			}
		}
	});
}

function deleteStablishment(req, res){
	var stablishmentId = req.params.id;
	
	Stablishment.findByIdAndRemove(stablishmentId, (err, stablishmentRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!stablishmentRemoved){
				res.status(404).send({message: 'No se ha borrado el establecimiento'});
			}else{
				res.status(200).send({stablishment: stablishmentRemoved});
			}
		}
	});
}

function uploadImage(req, res){
	var stablishmentId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.img.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF'){

			Stablishment.findByIdAndUpdate(stablishmentId, {image: file_name}, (err, stablishmentUpdated) => {
				if(!stablishmentId){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({stablishment: stablishmentUpdated});
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
	var path_file = './uploads/stablishments/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getStablishment,
	saveStablishment,
	getStablishments,
	updateStablishment,
	deleteStablishment,
	uploadImage,
	getImageFile
};