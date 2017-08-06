'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '1Q2w3e4r5t';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		state: user.state,
		city: user.city,
		address: user.address,
		telephone: user.telephone,
		rfc: user.rfc,
		zip: user.zip,
		img: user.img,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};