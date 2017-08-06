'use strict'

var express = require('express');
var CompanyController = require('../controllers/company');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/companys' });

api.get('/company/:id', md_auth.ensureAuth, CompanyController.getCompany);
api.post('/company', md_auth.ensureAuth, CompanyController.saveCompany);
api.get('/companys/:page?', md_auth.ensureAuth, CompanyController.getCompanys);
api.delete('/company/:id', md_auth.ensureAuth, CompanyController.deleteCompany);
api.put('/company/:id', md_auth.ensureAuth, CompanyController.updateCompany);
api.post('/upload-image-company/:id', [md_auth.ensureAuth, md_upload], CompanyController.uploadImage);
api.get('/get-image-company/:imageFile', CompanyController.getImageFile);

module.exports = api;