/**
 * Contiene las funciones HTTP que gestionan el usuario
 *
 * Created by danihbelan on 27/12/2017.
 */
var express = require('express');
var route = express.Router();
//var util = require("../../privates/db/util");
//var mysql = require('../../privates/db');
var csrfProtection = require("../../inits/csrf");
//var schemeInput = require("../../privates/schemasJSON/schemasInput")
//var multiparty = require('connect-multiparty');
//var	multipartyMiddleware = multiparty();
var fs = require('fs');
var path = require('path');

/**
 * Constructor de modulo
 * @param app   Aplicacion NodeJS
 * @param settings  Configuracion
 * @param root  Path al que atendera este archivo
 */
module.exports = function(app, settings, root){
	app.use(root,route);
};

/**
 * Comprobamos que el usuario esta logueado
 * @param session   Session
 * @returns {*|boolean} Si esta o no autorizada
 */
function isAuthorized(session){
	return session.id;
}

/**
 * Filtramos todas las llamadas para comprobar que existe sesion
 */
route.use(function(req, res, next) {
	if(isAuthorized(req.session)){
		next();
	}else{
		res.json(util.responseJSON(1100));
	}
});









