/**
 * Contiene las funciones HTTP que gestionan el frontend de la aplicacion
 *
 * Created by danihbelan on 26/12/2017.
 */
'use strict';
var async = require("async");

var csrfProtection = require("../../inits/csrf");
var mysql = require('../../privates/database');
var util = require("./../../privates/database/util");
var fs = require('fs');
var lodash = require('lodash');

var express = require('express');
var route = express.Router();

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
 * Pantalla de login
 */
route.get('/', csrfProtection, function(req, res, next) {
	var csrf = req.csrfToken();
	res.append("x-csrf", csrf);
	res.render('login', {csrfToken : csrf});
});

/**
 * Pantalla de login
 */
route.get('/index', csrfProtection, function(req, res, next) {
	res.render('login', {csrfToken : req.csrfToken()});
});

/**
 * Pantallas de usuario
 */
route.get('/user*',csrfProtection, function(req, res) {
  initUser(req, res)
});

function renderError(res, head, text){
	res.render('infoSoftPLC',
		{head: head,
			text:text
		}
	);
}


function initUser(req, res){
  //Comprobamos DEBE estar relleno el idUser
  /*if (!req.session.internal.idUser) {
    // Si no esta logueado lo enviamos al login
    res.redirect("/");
    return;
  }
  var idUser = req.session.internal.idUser;*/

	//Otras comprobaciones pertinentes

  res.render('index', {logued: req.session.user,
    csrfToken : req.csrfToken()
  });

}
