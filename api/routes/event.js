'use strict'

var express = require('express');
var EventController = require('../controllers/event');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/event/:id', md_auth.ensureAuth, EventController.getEvent);
api.post('/event', md_auth.ensureAuth, EventController.saveEvent);
api.get('/events/:page?', md_auth.ensureAuth, EventController.getEvents);
api.delete('/event/:id', md_auth.ensureAuth, EventController.deleteEvent);
api.put('/event/:id', md_auth.ensureAuth, EventController.updateEvent);

module.exports = api;