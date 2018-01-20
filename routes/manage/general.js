/**
 * Contiene las funciones HTTP que gestionan las rutas generales
 * En su mayoría se trata de peticiones a la base de datos
 *
 * Created by danihbelan on 27/12/2017.
 */
var express = require('express');
var route = express.Router();
var mysql = require('../../privates/database');
var util = require("../../privates/database/util");
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
 * Loguea a un usuario
 * Si se ha logueado correctamente almacenaremos en la sesion idUser
 */
route.post("/login", csrfProtection, function(req, res) {
    var name = req.body.name;
    var password = req.body.pass;

    mysql.general.login(email, password, function(result){
        if(result.error == 0){
	        var user = result.result;
            req.session.internal.idUser = user.id;
            req.session.internal.permises = user.permises;

            //Comprobamos si solo tiene un permiso y en tal caso asignarlo al rol del usuario
            if(req.session.internal.permises == 1){
                req.session.internal.idRol = user.permises[0];
            }

	        req.session.user = user;

	        //Quitamos datos que al usuario no le interesan
	        delete user.old_password;
	        delete user.password;
	        delete user.recover_password;
	        delete user.isValidate;
	        delete user.tokenMail;
	        delete user.isValidateMail;

	        result.result = user;

        }
        res.json(result);
    });
});

/**
 * Cierra sesion de un usuario
 */
route.post("/logout", csrfProtection, function(req, res) {
	req.session.internal = {};
	req.session.user = {};

	res.json(util.responseJSON(0));
});






