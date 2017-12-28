/**
 * Contiene las funciones HTTP que gestionan el frontend de la aplicacion
 *
 * Created by danihbelan on 26/12/2017.
 */
'use strict';
var async = require("async");
//var util = require("./../privates/db/util");
var csrfProtection = require("../../inits/csrf");


var express = require('express');
var route = express.Router();

/**
 * Constructor de modulo
 * @param app   Aplicacion NodeJS
 * @param settings  Configuracion
 * @param root  Path al que atendera este archivo
 */
module.exports = function(app, settings, root){
	app.use(root,route);
};

route.all(function(req, res, next){
	console.log('XSRF-TOKEN')
	res.cookie('XSRF-TOKEN', req.csrfToken());
	next()
})

/* -----------------------
 --------- Login ---------
 ------------------------*/
route.get('/login/login', csrfProtection, function(req, res) {
	res.render("login/login", {csrfToken : req.csrfToken()})
});


/* -------------------------
 ------- User -------
 ---------------------------*/
route.get('/user/profile', csrfProtection, function(req, res) {
  console.log('Entra en perfil')
	res.render("user/view/profile" , {csrfToken : req.csrfToken()})
});

route.get('/user/generalData', csrfProtection, function(req, res) {
  res.render("user/view/generalData" , {csrfToken : req.csrfToken()})
});


