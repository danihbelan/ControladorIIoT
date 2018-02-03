/**
 * Created by danihbelan on 22/12/17.
 */

"use strict";
var util = require('./util')

/***********************************
 ----------- WebService ------------
 **********************************/
var Plc;
var TAME = require('./tame.js')
var loadFunctions

/**
 * Función encargada de realizar las request al PLC
 *
 * @param handles
 * @returns {Object|any|*}
 */
var requestPLC = function (handles) {

    Plc = TAME.WebServiceClient.createClient({
        serviceUrl: 'http://localhost/TcAdsWebService/TcAdsWebService.dll',
        amsNetId: '192.168.30.101.1.1',
        amsPort: '851',       //AMS port
        useHandles: handles,  //use handles
        alignment: '8',       //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
        onReady: loadFunctions          //contiene las funciones de control
    });

}


/***********************************
 --------------- PLC ---------------
 **********************************/
var output = {
    1: '.VAR1',
    2: '.VAR2',
    3: '.VAR3',
    4: '.VAR4',
    5: '.VAR5',
    6: '.VAR6',
    7: '.VAR7',
    8: '.VAR8'
};
var field1 = null;


//**Funciones a exportar para llamar desde el gestor de rutas**
//**Lamada usando reflexiones para acceder a funciones dentro de la funcion loadFuctions**

//Ejemplo de funcion llamada desde el cliente
exports.startClient = function (callback) {

    callback()
};

/**
 * Función que escribe un boolean en una salida digital
 *
 * @param id        identificador de la salida
 * @param callback  Función callback
 */
exports.readData = function (id, callback) {
    var data
    loadFunctions = function () {
        console.log('Reading...')
        var res = function () {
            console.log('Estado despues de leer: ' + data)
            var salida = {state: data}
            callback(util.responseJSON(0, salida))
        }

        var handles = Plc.getHandles({
            symbols: [
                '.In_Bool1', '.In_Bool2', '.IN_SINT1', '.IN_INT1', '.IN_DINT', '.IN_STRING',
                '.IN_TIME', '.IN_REAL', '.TOD_TEST', '.DT_TEST', '.DATE_TEST',
                'MAIN.fbRamp1.nRamp', 'MAIN.fbRamp2.nRamp'],
            oc: function() {
                console.log('HANDLES:' + handles)
                Plc.readBool({name: output[id], jvar: 'data', oc: res, ocd: 50});
            }
        });
    }
    requestPLC()
};

/**
 * Función que lee el estado de una salida/entrada digital
 *
 * @param id        identificador de la salida/entrada
 * @param state     valor a escribir
 * @param callback  Función callback
 */
exports.writeData = function (id, state, callback) {
    var data
    loadFunctions = function () {
        var res = function () {
            console.log('Estado despues de escibir: ' + data)
            var salida = {state: data}
            callback(util.responseJSON(0, salida))
        }

        var readValue = function () {
            Plc.readBool({name: output[id], jvar: 'data', oc: res, ocd: 50});
        };

        Plc.writeBool({name: output[id], val: state, oc: readValue, ocd: 50})

    }
    requestPLC()
};





