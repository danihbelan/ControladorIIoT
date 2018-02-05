/**
 * Contiene las funciones HTTP que gestionan las rutas del usuario
 * En su mayoría se trata de peticiones al PLC o la base de datos
 *
 * Created by danihbelan on 27/12/2017.
 */
var express = require('express');
var route = express.Router();
var util = require("../../privates/database/util");
var PLC = require('../../privates/softPLC/PLC')

/**
 * Constructor de modulo
 *
 * @param app   Aplicacion NodeJS
 * @param settings  Configuracion
 * @param root  Path al que atendera este archivo
 */
module.exports = function (app, settings, root) {
    app.use(root, route);
};

/**
 * Funcion que comprueba que el usuario esta logueado
 *
 * @param session   Session
 * @returns {*|boolean} Si esta o no autorizada
 */
function isAuthorized(session) {
    return session.id;
}

/**
 * Filtramos todas las llamadas para comprobar que existe sesion
 */
/*route.use(function (req, res, next) {
    if (isAuthorized(req.session)) {
        next();
    } else {
        res.json(util.responseJSON(1000));
    }
});*/


/**
 * Ruta que lee un dato de una salida del modulo PLC
 */
route.post("/readData", function (req, res) {
    var id = req.body.id

    PLC.readData(id, function (result) {
        res.json(result)
    });
});

/**
 * Ruta que escribe un dato en una salida del modulo PLC
 */
route.post("/writeData", function (req, res) {
    var ids = req.body.ids
    var states = req.body.states

    PLC.writeData(ids, states, function (result) {
        res.json(result)
    });
});







