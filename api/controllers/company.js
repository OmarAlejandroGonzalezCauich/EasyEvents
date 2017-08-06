'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Company = require('../models/company');

function getCompany(req, res){

	var companyId = req.params.id;

	Company.findById(companyId, (err, company) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!company){
				res.status(404).send({message: 'La compañia no existe'});
			}else{
				res.status(200).send({company});
			}
		}
	});
}

function getCompanys(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Company.find().sort('name').paginate(page, itemsPerPage, function(err, companys, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!companys){
				res.status(404).send({message: 'No hay compañias !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					companys: companys
				});
			}
		}
	});
}


function saveCompany(req, res){
	var company = new Company();

	var params = req.body;

	company.name = params.name;
	company.email  = params.email;
	company.telephone = params.telephone;
	company.address = params.address;
	company.city = params.city;
	company.state = params.state;
	company.zip = params.zip;
	company.img = null;
	company.website = params.website;

	company.save((err, companyStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!companyStored){
				res.status(404).send({message: 'No se ha guardado la canción'});
			}else{
				res.status(200).send({company: companyStored});
			}
		}
	});
}

function updateCompany(req, res){
	var companyId = req.params.id;
	var update = req.body;

	Company.findByIdAndUpdate(companyId, update, (err, companyUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al guardar al proveedor'});
		}else{
			if(!companyUpdated){
				res.status(404).send({message: 'El proveedor no ha sido actualizado'});
			}else{
				res.status(200).send({company: companyUpdated});
			}
		}
	});
}

function deleteCompany(req, res){
	var companyId = req.params.id;
	
	Company.findByIdAndRemove(companyId, (err, companyRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!companyRemoved){
				res.status(404).send({message: 'No se ha borrado la compañia'});
			}else{
				res.status(200).send({company: companyRemoved});
			}
		}
	});
}

function uploadImage(req, res){
	var companyId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.img.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF'){

			Company.findByIdAndUpdate(companyId, {image: file_name}, (err, companyUpdated) => {
				if(!companyId){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({company: companyUpdated});
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
	var path_file = './uploads/companys/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getCompany,
	getCompanys,
	saveCompany,
	updateCompany,
	deleteCompany,
	uploadImage,
	getImageFile
	
};