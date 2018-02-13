/**
 * Created by danihbelan on 22/12/17.
 */

"use strict";
var util = require('../database/util.js')
var lodash = require('lodash')
var query = require('../../privates/database/subsistems/general')


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

var stateRoof

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
var out_bool_1
var out_bool_2
var out_bool_5
var out_bool_6
var in_bool_1
var in_bool_2
var in_bool_5
var in_bool_6

var in_int_1

exports.getVariables = function (callback) {
    callback(util.responseJSON(0, arrayVariables))
}

exports.setVariables = function (roof, wall, res, vent, callback) {
    roofVar = roof
    wallVar = wall
    resistencia = res
    ventilador = vent

    callback(util.responseJSON(0))
}


/*************** ROOF ***************/

exports.openRoof = function (callback) {
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: roofVar.openSensor, jvar: 'in_bool_1',
                oc: function () {
                    if (out_bool_1 == false || in_bool_1 == false)
                        Plc.writeBool({name: roofVar.open, val: false, oc: res})
                    else
                        check()
                }
            })
        };

        out_bool_1 = true
        Plc.writeBool({name: roofVar.close, val: false})
        Plc.writeBool({name: roofVar.open, val: true, oc: check})
    }
    requestPLC()
};

exports.closeRoof = function (callback) {
    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: roofVar.closeSensor, jvar: 'in_bool_2',
                oc: function () {
                    if (out_bool_2 == false || in_bool_2 == false)
                        Plc.writeBool({name: roofVar.close, val: false, oc: res})
                    else
                        check()
                }
            })
        };

        out_bool_2 = true
        Plc.writeBool({name: roofVar.open, val: false})
        Plc.writeBool({name: roofVar.close, val: true, oc: check})


    }
    requestPLC()
};

exports.stopRoof = function (callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        out_bool_1 = false
        out_bool_2 = false
        Plc.writeBool({name: roofVar.open, val: false,
            oc: Plc.writeBool({name: roofVar.close, val: false, oc: res})
        })


    }
    requestPLC()
};

/*************** WALL ***************/

exports.moveRightWall = function (callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: wallVar.rightSensor, jvar: 'in_bool_6',
                oc: function () {
                    if (out_bool_5 == false || in_bool_6 == false)
                        Plc.writeBool({name: wallVar.right, val: false, oc: res})
                    else
                        check()
                }
            })
        };

        out_bool_5 = true
        Plc.writeBool({name: wallVar.left, val: false})
        Plc.writeBool({name: wallVar.right, val: true, oc: check})
    }
    requestPLC()
};

exports.moveLeftWall = function (callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        var check = function () {
            Plc.readBool({name: wallVar.leftSensor, jvar: 'in_bool_5',
                oc: function () {
                    if (out_bool_6 == false || in_bool_5 == false)
                        Plc.writeBool({name: wallVar.left, val: false, oc: res})
                    else
                        check()
                }
            })
        };

        out_bool_6 = true
        Plc.writeBool({name: wallVar.right, val: false})
        Plc.writeBool({name: wallVar.left, val: true, oc: check})
    }
    requestPLC()
};

exports.stopWall = function (callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }

        out_bool_5 = false
        out_bool_6 = false
        Plc.writeBool({name: wallVar.right, val: false,
            oc: Plc.writeBool({name: wallVar.left, val: false, oc: res})
        })


    }
    requestPLC()
};

/*************** VENTILADOR ***************/

exports.changeVentilador = function (value, callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }
        //Guardamos el valor para guardarlo en la base de datos
        ventiladorValue = value
        //Escalamos el valor
        var data = Math.round(value * 327.67)
        Plc.writeInt({name: ventilador.ventilador, val: data, oc: res})

    }
    requestPLC()
};

/*************** RESISTENCIA ***************/

exports.changeResistencia = function (value, callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }
        //Guardamos el valor para guardarlo en la base de datos
        resistenciaValue = value
        //Escalamos el valor
        var data = Math.round(value * 327.67)
        Plc.writeInt({name: resistencia.resistencia, val: data, oc: res})

    }
    requestPLC()
};

/*************** RESISTENCIA ***************/

exports.abort = function (callback) {

    loadFunctions = function () {
        var res = function () {
            callback(util.responseJSON(0))
        }
console.log('ABORT')
        Plc.writeInt({name: ventilador.ventilador, val: 0,
            oc: Plc.writeInt({name: resistencia.resistencia, val: 0,
                oc: Plc.writeBool({name: wallVar.right, val: false,
                    oc: Plc.writeBool({name: wallVar.left, val: false,
                        oc: Plc.writeBool({name: roofVar.close, val: false,
                            oc: Plc.writeBool({name: wallVar.right, val: false,
                                oc: res})
                        })
                    })
                })
            })
        })

    }
    requestPLC()
};

/*************** TERMOMETRO ***************/
var stateTermometro = true

var readTemperature = function () {

    loadFunctions = function () {

        var saveTemperature = function () {
            //Convertimos el valor a grados centigrados
            var temperature = in_int_1 * 0.0021176
            temperature = lodash.round(temperature, 2)
            //Obtenemos la marca de tiempo
            var timedate = new Date().toMysqlFormat();

            //Almacenamos la temperatura en la base de datos
            //query.setTemperature([temperature, timedate], function (result) {})
            query.setValues([temperature, ventiladorValue, resistenciaValue, timedate], function (result) {})

            //Volvemos a medir la temperatura
            setTimeout(function () {
                if(stateTermometro)
                    Plc.readInt({name: termometro.termometro, jvar: 'in_int_1', oc: saveTemperature})
            },5000)
        }

        var stateTermometro = true
        Plc.readInt({name: termometro.termometro, jvar: 'in_int_1', oc: saveTemperature})
    }
    requestPLC()
};

//Inicializamos al cargar el servidor que comience a leer la temperatura y guarde los valores
var ventiladorValue = 0;
var resistenciaValue = 0;
readTemperature()

exports.setStateTermometro = function (state, callback) {

    if (state==true && stateTermometro==false){
        stateTermometro = true;
        readTemperature()
    }else if(state==false)
        stateTermometro == false

    callback(util.responseJSON(0))
};

/////////////////////////////////////////////////

//Función a llamar desde la librería TAME para guarda la variable devuelta
exports.setVar = function (data) {
    switch (data.varName) {
        case "out_bool_1":
            out_bool_1 = data.varValue
            break;
        case "out_bool_2":
            out_bool_2 = data.varValue
            break;
        case "out_bool_5":
            in_bool_5 = data.varValue
            break;
        case "out_bool_6":
            out_bool_6 = data.varValue
            break;
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


//Función que convierte la fecha tipo Date a DATETIME
function twoDigits(d){
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) +
    " " + twoDigits(1 + this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds())
}





