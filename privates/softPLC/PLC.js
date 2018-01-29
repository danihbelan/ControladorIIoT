/**
 * Created by danihbelan on 22/12/17.
 */
var webservice = require('./webservice')
var Plc;
var output = {
  1: '.MAIN.VAR1',
  2: '.MAIN.VAR2',
  3: '.MAIN.VAR3',
  4: '.MAIN.VAR4',
  5: '.MAIN.VAR5',
  6: '.MAIN.VAR6',
  7: '.MAIN.VAR7',
  8: '.MAIN.VAR8'
};

"use strict";

//Function for starting the client. Defined in "webservice.js"
exports.startClient = function (callbak) {
  //TODO Llamar a la funcion que lee la configuración XML

  Plc = webservice.startClient();
  callbak()
};


//This function is called if client is ready (on-ready-function).
//See "webservice.js"
exports.loadFunctions = function () {
  console.log('Load Functions')
};

/**
 * Lee un valor de una salida del modulo KL2408
 *
 * @param idOutput
 * @param callback
 */
exports.readData = function(idOutput, callback) {
  Plc.readBool({name: output.idOutput, jvar: 'data', oc: callback(data), ocd: 50});
};

/**
 * Escribe un valor en una salida del modulo KL2408
 *
 * @param idOutput
 * @param state
 * @param callback
 */
exports.writeData = function(idOutput, state, callback) {
  console.log('Escribiendo...')
  var wert = state;
  Plc.writeBool({name: output.idOutput, val: wert, oc: callback(), ocd: 50});
};



//TODO implementar función que lea el fichero de configuración XML
