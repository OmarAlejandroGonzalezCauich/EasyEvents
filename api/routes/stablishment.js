'use strict'

var express = require('express');
var StablishmentController = require('../controllers/stablishment');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/stablishments' });

api.get('/stablishment/:id', md_auth.ensureAuth, StablishmentController.getStablishment);
api.post('/stablishment', md_auth.ensureAuth, StablishmentController.saveStablishment);
api.get('/stablishments/:page?', md_auth.ensureAuth, StablishmentController.getStablishments);
api.put('/stablishment/:id', md_auth.ensureAuth, StablishmentController.updateStablishment);
api.delete('/stablishment/:id', md_auth.ensureAuth, StablishmentController.deleteStablishment);
api.post('/upload-image-stablishment/:id', [md_auth.ensureAuth, md_upload], StablishmentController.uploadImage);
api.get('/get-image-stablishment/:imageFile', StablishmentController.getImageFile);


module.exports = api;