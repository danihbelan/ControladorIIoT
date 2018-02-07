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
//var requestPLC = function (handles) {
function requestPLC() {

    Plc = TAME.WebServiceClient.createClient({
        serviceUrl: 'http://localhost/TcAdsWebService/TcAdsWebService.dll',
        amsNetId: '192.168.30.101.1.1',
        amsPort: '851',       //AMS port
        useHandles: false,  //use handles
        alignment: '8',       //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
        onReady: loadFunctions          //contiene las funciones de control
    });

}


/***********************************
 --------------- PLC ---------------
 **********************************/

//**Funciones a exportar para llamar desde el gestor de rutas**
//**Lamada usando reflexiones para acceder a funciones dentro de la funcion loadFuctions**

var roofVar = {
    open: '.OUT_BOOL_1',
    close: '.OUT_BOOL_2',
    openSensor: '.IN_BOOL_1',
    closeSensor: '.IN_BOOL_2',
}

var wallVar = {
    right: '.OUT_BOOL_5',
    left: '.OUT_BOOL_6',
    leftSensor: '.IN_BOOL_5',
    rightSensor: '.IN_BOOL_6',
}

var resistencia = {resistencia: '.OUT_INT_1'}
var ventilador = {ventilador: '.OUT_INT_2'}
var termometro = {termometro: '.IN_INT_1'}

var arrayVariables = {roof: roofVar, wall: wallVar, res: resistencia, vent: ventilador, term: termometro}

//Variables a leer
var in_bool_1
var in_bool_2
var in_bool_5
var in_bool_6

var in_int_1

exports.getVariables = function(callback) {
    callback(util.responseJSON(0, arrayVariables))
}

exports.setVariables = function(roof, wall, res, vent, callback) {
    roofVar = roof
    wallVar = wall
    resistencia = res
    ventilador = vent

    callback(util.responseJSON(0))
}


/*************** ROOF ***************/

exports.openRoof = function (callback) {
    var sensor
    var output
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: roofVar.openSensor, jvar: 'sensor'});
            Plc.readBool({name: roofVar.open, jvar: 'output'});

            if(sensor==false || output==false)
                Plc.writeBool({name: roofVar.open, val: false, oc: res})
            else
                check()
        };

        //Plc.writeBool({name: roofVar.close, val: false})
        //Plc.writeBool({name: roofVar.open, val: true, oc: check})
        Plc.writeBool({name: roofVar.close, val: false})
        Plc.writeBool({name: roofVar.open, val: true})
    }
    requestPLC()
};

exports.closeRoof = function (callback) {

    var sensor
    var output
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: roofVar.closeSensor, jvar: 'sensor'});
            Plc.readBool({name: roofVar.close, jvar: 'output'});

            if(sensor==false || output==false)
                Plc.writeBool({name: roofVar.close, val: false, oc: res})
            else
                check()
        };

        //Plc.writeBool({name: roofVar.open, val: false})
        //Plc.writeBool({name: roofVar.close, val: true, oc: check})
        Plc.writeBool({name: roofVar.open, val: false})
        Plc.writeBool({name: roofVar.close, val: true})

    }
    requestPLC()
};

exports.stopRoof = function (callback) {
    var output1
    var output2
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: roofVar.open, jvar: 'output1'});
            Plc.readBool({name: roofVar.close, jvar: 'output2'});

            if(output1 || output2){
                Plc.writeBool({name: roofVar.open, val: false})
                Plc.writeBool({name: roofVar.close, val: false, oc: check})
           }else
                res()
        };


         //Plc.writeBool({name: roofVar.open, val: true})
         //Plc.writeBool({name: roofVar.close, val: true, oc: check})
         Plc.writeBool({name: roofVar.open, val: false})
         Plc.writeBool({name: roofVar.close, val: false})

    }
    requestPLC()
};

/*************** WALL ***************/

exports.moveRightWall = function (callback) {

    var sensor
    var output
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: wallVar.rightSensor, jvar: 'sensor'});
            Plc.readBool({name: wallVar.right, jvar: 'output'});

            if(sensor==false || output==false)
                Plc.writeBool({name: wallVar.right, val: false, oc: res})
            else
                check()
        };

        Plc.writeBool({name: wallVar.left, val: false})
        //Plc.writeBool({name: wallVar.right, val: true, oc: check})
        Plc.writeBool({name: wallVar.right, val: true})
    }
    requestPLC()
};

exports.moveLeftWall = function (callback) {

    var sensor
    var output
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: wallVar.leftSensor, jvar: 'sensor'});
            Plc.readBool({name: wallVar.left, jvar: 'output'});

            if(sensor==false || output==false)
                Plc.writeBool({name: wallVar.close, val: false, oc: res})
            else
                check()
        };

        Plc.writeBool({name: wallVar.right, val: false})
        //Plc.writeBool({name: wallVar.left, val: true, oc: check})
        Plc.writeBool({name: wallVar.left, val: true})

    }
    requestPLC()
};

exports.stopWall = function (callback) {
    var output1
    var output2
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: wallVar.left, jvar: 'output1'});
            Plc.readBool({name: wallVar.right, jvar: 'output2'});

            if(output1 || output2){
                Plc.writeBool({name: wallVar.left, val: false})
                Plc.writeBool({name: wallVar.right, val: false, oc: check})
            }else
                res()
        };


        //Plc.writeBool({name: wallVar.open, val: true})
        //Plc.writeBool({name: wallVar.close, val: true, oc: check})
        Plc.writeBool({name: wallVar.left, val: false})
        Plc.writeBool({name: wallVar.right, val: false})

    }
    requestPLC()
};

/*************** VENTILADOR ***************/

exports.changeVentilador = function (value, callback) {

   loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }
        var data = Math.round(value * 327.67)
        Plc.writeInt({name: ventilador, val: data, oc: res})

    }
    requestPLC()
};

/*************** RESISTENCIA ***************/

exports.changeResistencia = function (value, callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }
        var data = Math.round(value * 327.67)
        Plc.writeInt({name: resistencia, val: data, oc: res})

    }
    requestPLC()
};


exports.read = function (callback) {

    loadFunctions = function () {
        var res = function () {
            var response = temperatureVar
            callback(util.responseJSON(0, response))
        }

        Plc.readInt({
            name: ".IN_INT_1",
            jvar: "in_int_1",
            oc: function(){
                console.log("Valor: " +in_int_1)
            }
        })

    }
    requestPLC()
};

//Funcióne a llamar desde la librería TAME para guarda la variable devuelta
exports.setVar = function(data) {
    switch (data.varName){
        case "in_bool_1":
            in_bool_1 = data.varValue
            break;
        case "in_bool_2":
            in_bool_2 = data.varValue
            break;
        case "in_bool_5":
            in_bool_5 = data.varValue
            break;
        case "in_bool_6":
            in_bool_6 = data.varValue
            break;
        case "in_int_1":
            in_int_1 = data.varValue
            break;

    }
}




