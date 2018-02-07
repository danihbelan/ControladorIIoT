/**
 * Created by danihbelan on 26/12/2017.
 */

var session = require('express-session');
var config = require('../constantes');

module.exports = function (app) {
	var optionsSession = {
		secret: 'paral3l3P1p3D0', //Sesion ID
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true,
		}
	};

	// Iniciamos la sesion
	app.use(session(optionsSession));
}