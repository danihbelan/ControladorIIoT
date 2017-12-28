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

	if (config.sessionDB) {
		var RedisStore = require('connect-redis')(session);
		var redis = require("redis").createClient();
		var store;

		store = new RedisStore({
			host: config.dbSession.host,
			port: config.dbSession.port,
			client: redis
		});

		store.on('disconnect', function () {
			console.log('Redis disconnect');
		});

		store.on('connect', function () {
			console.log('Redis conected');
		});

		optionsSession.store = store;
	}

	// Iniciamos la sesion
	app.use(session(optionsSession));
}