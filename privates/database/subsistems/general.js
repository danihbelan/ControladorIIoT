/**
 * Created by danihbelan on 20/1/18.
 */

"use strict";
var mysql = require("./../index");
var async = require("async");
var config = require('../../../constantes');

/**
 * Realizan un login devolviendo por callback todos los datos del usuario
 *
 * @param input     Nombre del usuario
 * @param password  Password del usuario
 * @param callback  Funcion de vuelta
 */
exports.login = function(datosLogin, callback){
  var input = [datosLogin.mail, datosLogin.password]
  var qLogin =
    "SELECT id, name, last_name_1, last_name_2, mail, password, phone"+
    "FROM Users " +
    "WHERE mail = ?";

  mysql.query(qLogin,input, function (err, user){
    if(err){
      console.error(err);
      return callback(mysql.utils.responseJSON(100));
    }else{
      //No existe dicho usuario
      if(user.length != 1){
        return callback(mysql.utils.responseJSON(101));
      }

      //Comprobamos el password del usuario
      if(user[0].password != password)
        return callback(mysql.utils.responseJSON(100));

      //Eliminamos el password de la respuesta
      delete user[0].password

      callback(mysql.utils.responseJSON(0, user[0]));
    }
  })
}

