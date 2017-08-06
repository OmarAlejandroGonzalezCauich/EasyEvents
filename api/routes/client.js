'use strict'

var express = require('express');
var ClientController = require('../controllers/client');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/clients' });

api.get('/client/:id', md_auth.ensureAuth, ClientController.getClient);
api.post('/client', md_auth.ensureAuth, ClientController.saveClient);
api.get('/clients/:page?', md_auth.ensureAuth, ClientController.getClients);
api.delete('/client/:id', md_auth.ensureAuth, ClientController.deleteClient);
api.put('/client/:id', md_auth.ensureAuth, ClientController.updateClient);
api.post('/upload-image-client/:id', [md_auth.ensureAuth, md_upload], ClientController.uploadImage);
api.get('/get-image-client/:imageFile', ClientController.getImageFile);
api.get('/probando-client', md_auth.ensureAuth, ClientController.prueba);

module.exports = api;