'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Provider = require('../models/provider');

function getProvider(req, res){

	var providerId = req.params.id;

	Provider.findById(providerId, (err, provider) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!provider){
				res.status(404).send({message: 'El proveedor no existe'});
			}else{
				res.status(200).send({provider});
			}
		}
	});
}

function getProviders(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Provider.find().sort('name').paginate(page, itemsPerPage, function(err, providers, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!providers){
				res.status(404).send({message: 'No hay proveedores !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					providers: providers
				});
			}
		}
	});
}


function saveProvider(req, res){
	var provider = new Provider();

	var params = req.body;
	provider.name = params.name;
	provider.email  = params.email;
	provider.telephone = params.telephone;
	provider.address = params.address;
	provider.city = params.city;
	provider.state = params.state;
	provider.zip = params.zip;
	provider.img = null;
	provider.product = params.product;
	provider.description = params.description;
	provider.price = params.price;

	provider.save((err, providerStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!providerStored){
				res.status(404).send({message: 'No se ha guardado la canción'});
			}else{
				res.status(200).send({provider: providerStored});
			}
		}
	});
}

function updateProvider(req, res){
	var providerId = req.params.id;
	var update = req.body;

	Provider.findByIdAndUpdate(providerId, update, (err, providerUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar al proveedor'});
		}else{
			if(!providerUpdated){
				res.status(404).send({message: 'El proveedor no ha sido actualizado'});
			}else{
				res.status(200).send({provider: providerUpdated});
			}
		}
	});
}

function deleteProvider(req, res){
	var providerId = req.params.id;
	
	Provider.findByIdAndRemove(providerId, (err, providerRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!providerRemoved){
				res.status(404).send({message: 'No se ha borrado el establecimiento'});
			}else{
				res.status(200).send({provider: providerRemoved});
			}
		}
	});
}

function uploadImage(req, res){
	var providerId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Provider.findByIdAndUpdate(providerId, {img: file_name}, (err, providerUpdated) => {
				if(!providerId){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({provider: providerUpdated});
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
	var path_file = './uploads/providers/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getProvider,
	getProviders,
	saveProvider,
	updateProvider,
	deleteProvider,
	uploadImage,
	getImageFile
	
};