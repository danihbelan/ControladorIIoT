/**
 * Created by danihbelan on 22/12/17.
 */

//Webservice definition
var Plc;
var TAME = require('./tame.js')
var loadFunctions = require("./PLC").loadFunctions


exports.startClient = function(handles) {

  Plc =  TAME.WebServiceClient.createClient({
    serviceUrl: 'http://192.168.30.100/TcAdsWebService/TcAdsWebService.dll',
    //configFileUrl: 'http://192.168.1.2/tamex/resources/demo2.tpy',  //Path to the TPY file
    amsNetId: '169.254.168.184.1.1',
    amsPort: '851',       //default
    useHandles: handles,    //use handles
    alignment: '8',       //default, set it to "4" if you have TC2 and an ARM based PLC device (i.e. CX90xx), to 8 with TC3
    //language: 'ge',       //default, set it to "en" for english names of days and months
    onReady: loadFunctions    //contiene las funciones de control
  });
  return Plc
}
