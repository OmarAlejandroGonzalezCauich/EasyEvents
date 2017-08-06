'use strict'

var express = require('express');
var ProviderController = require('../controllers/provider');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/providers' });

api.get('/provider/:id', md_auth.ensureAuth, ProviderController.getProvider);
api.post('/provider', md_auth.ensureAuth, ProviderController.saveProvider);
api.get('/providers/:page?', md_auth.ensureAuth, ProviderController.getProviders);
api.delete('/provider/:id', md_auth.ensureAuth, ProviderController.deleteProvider);
api.put('/provider/:id', md_auth.ensureAuth, ProviderController.updateProvider);
api.post('/upload-image-provider/:id', [md_auth.ensureAuth, md_upload], ProviderController.uploadImage);
api.get('/get-image-provider/:imageFile', ProviderController.getImageFile);

module.exports = api;