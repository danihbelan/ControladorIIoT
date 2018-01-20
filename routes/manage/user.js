/**
 * Contiene las funciones HTTP que gestionan las rutas del usuario
 * En su mayoría se trata de peticiones al PLC
 *
 * Created by danihbelan on 27/12/2017.
 */
var express = require('express');
var route = express.Router();
var util = require("../../privates/database/util");
var PLC = require('../../privates/softPLC/PLC')
var csrfProtection = require("../../inits/csrf");


/**
 * Constructor de modulo
 *
 * @param app   Aplicacion NodeJS
 * @param settings  Configuracion
 * @param root  Path al que atendera este archivo
 */
module.exports = function(app, settings, root){
	app.use(root,route);
};

/**
 * Funcion que comprueba que el usuario esta logueado
 *
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


/**
 * Crea un cliente PLC
 */
route.get("/startClient", csrfProtection,function(req, res){
	PLC.startClient(function(result){
    res.json(result)
  });
});

/**
 * Ruta que lee un dato de una salida del modulo PLC
 */
route.get("/readData", csrfProtection, function(req, res){
  var idOutput = req.session.internal.idOutput
  PLC.readData(idOutput,function(result){
    res.json(result)
  });
});

/**
 * Ruta que escribe un dato en una salida del modulo PLC
 */
route.post("/writeData", csrfProtection, function(req, res){
  var idOutput = req.session.internal.idOutput
  var state = req.session.internal.state
  PLC.writeData(idOutput, state, function(result){
    res.json(result)
  });
});







