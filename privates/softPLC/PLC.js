/**
 * Created by danihbelan on 22/12/17.
 */

/***********************************
 ----------- WebService ------------
 **********************************/
var Plc;
var TAME = require('./tame.js')

var startClient = function(handles) {

    Plc =  TAME.WebServiceClient.createClient({
        serviceUrl: 'http://192.168.30.100/TcAdsWebService/TcAdsWebService.dll',
        //configFileUrl: 'http://192.168.1.2/tamex/resources/demo2.tpy',  //Path to the TPY file
        amsNetId: '192.168.30.101.1.1',
        amsPort: '851',       //default
        useHandles: handles,    //use handles
        alignment: '8',       //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
        //language: 'ge',       //default, set it to "en" for english names of days and months
        onReady: loadFunctions    //contiene las funciones de control
    });
    console.log('PLC creado')
    return Plc
}



/***********************************
 --------------- PLC ---------------
 **********************************/
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
  Plc = startClient();
  callbak()
};


//This function is called if client is ready (on-ready-function).
//See "webservice.js"
function loadFunctions() {
    var data

    /**
     * Escribe un valor en una salida del modulo KL2408
     *
     * @param idOutput
     * @param state
     * @param callback
     */
    var writeData = function(idOutput, state, callback) {
        var wert = state;
        Plc.writeBool({name: output.idOutput, val: wert, oc: callback(), ocd: 50});
    };

    /**
     * Lee un valor de una salida del modulo KL2408
     *
     * @param idOutput
     * @param callback
     */
    var readData = function(idOutput, callback) {
        console.log('Leyendo..')
        Plc.readBool({name: output.idOutput, jvar: 'data', oc: callback(data), ocd: 50});
    };

    readData(1, function (data) {
     console.log('Leido!', data)
    })

};



