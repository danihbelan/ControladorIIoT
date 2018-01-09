/**
 * Created by danihbelan on 22/12/17.
 */
var webservice = require('./webservice')
var Plc;

"use strict";
//Function for starting the client. Defined in "webservice.js"

exports.startClient = function (callbak) {
  //TODO Llamar a la funcion que lee la configuración XML

  Plc = webservice.startClient();
  console.log('pasa por aqui:')
  callbak()
};


//This function is called if client is ready (on-ready-function).
//See "webservice.js"
exports.loadFunctions = function () {

  /**
   * Lee un valor en una salida del modulo KL2408
   *
   * @param idLed
   * @param callback
   */
  var readData = function(idLed, callback) {
    var data
    Plc.readBool({name: '.MAIN.VAR1', jvar: 'data', oc: callback(data), ocd: 50});
  };


  /**
   * Escribe un valor en una salida del modulo KL2408
   *
   * @param idLed
   * @param state
   * @param callback
   */
  var writeData = function(idLed, state, callback) {
    var wert = state;
    Plc.writeBool({name: '.MAIN.VAR1', val: wert, oc: callback(), ocd: 50});
  };
};


//TODO implementar función que lea el fichero de configuración XML
