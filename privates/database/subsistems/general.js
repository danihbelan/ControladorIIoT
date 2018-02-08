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
  var qLogin = "SELECT * FROM users WHERE mail = ?";

  mysql.query(qLogin, [datosLogin.mail], function (err, user){
    if(err){
      console.error(err);
      return callback(mysql.utils.responseJSON(100));
    }else{
      //No existe dicho usuario
      if(user.length != 1){
        return callback(mysql.utils.responseJSON(101));
      }

      //Comprobamos el password del usuario
      if(user[0].password != datosLogin.password)
        return callback(mysql.utils.responseJSON(100));

      //Eliminamos el password de la respuesta
      delete user[0].password

      callback(0, user);
    }
  })
}

exports.setTemperature = function(datos, callback){
    var query = "INSERT INTO temperatures(temperature, time) VALUES (?,?)";

    mysql.query(query, datos, function (err, user){
        if(err){
            console.error(err);
            return callback(mysql.utils.responseJSON(100));
        }else{
            callback(mysql.utils.responseJSON(0));
        }
    })
}

exports.getTemperatures = function(callback){
    var query = "SELECT * FROM temperatures";

    mysql.query(query, function (err, rows){
        if(err){
            console.error(err);
            return callback(mysql.utils.responseJSON(100));
        }else{
            callback(mysql.utils.responseJSON(0, rows));
        }
    })
}
