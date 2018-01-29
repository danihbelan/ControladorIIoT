/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict'

  angular.module('BlurAdmin.pages.dashboard')
    .controller('KL2408PanelCtrl', KL2408PanelCtrl)

  /** @ngInject */
  function KL2408PanelCtrl ($scope, $http, $filter, editableOptions, editableThemes) {

    $scope.data = [
      {id: 1, name: 'Output 1', state: false, newState: false},
      {id: 2, name: 'Output 2', state: false, newState: false},
      {id: 3, name: 'Output 3', state: false, newState: false},
      {id: 4, name: 'Output 4', state: false, newState: false},
      {id: 5, name: 'Output 5', state: false, newState: false},
      {id: 6, name: 'Output 6', state: false, newState: false},
      {id: 7, name: 'Output 7', state: false, newState: false},
      {id: 8, name: 'Output 8', state: false, newState: false}
    ]

    /**
     * Inicializador del controller
     */
    $scope.initController = function () {
      startPlcClient()
    }

    function startPlcClient () {
      var promised = $http.get('/m/u/startClient')
      promised.then(function successCallback (response) {
        //dialog_close()
      }, function errorCallback (data) {
        //dialog_error_desconocido(data.status)
      })

      //loadingDelay($timeout, promised, 'Cargando cliente softPLC')
    }

    /*----------------------------
     ----------- Buttons ----------
     ------------------------------ */

    /**
     * Función que responde al botón "Update data"
     * Se llama a la función "readData()" para cada una de las salidas
     */
    $scope.clickReadData = function () {
      angular.forEach($scope.data, function (out) {
        readData(out.id)
      });
    }

    /**
     * Función que responde al botón "Change data"
     * Se llama a la función "writeData()" para cada una de las salidas
     */
    $scope.clickWriteData = function () {
      /*angular.forEach($scope.data, function (out) {
        writeData(out.id, out.newState)
      });*/
      writeData(1, true)
    }


    /*--------------------------------
     ------------ Updates ------------
     --------------------------------- */

    function readData (idOut) {
      var json = {
        idOut: idOut
      }

      var promised = $http.get('/m/u/readData', json)
        promised.then(function success (response) {
          if (response.data.error == 0) {
            //TODO guardar estado en la variable correspondiente
            //lodash.find(data, {id: idOut})
           } else {
            console.log('Error: ',response.data)
          }

        }, function failed (data) {

        })
    }

    /**
     * Funcion que hace una petición POST para escribir un dato en una salida
     *
     * @param idOut
     * @param state
     */
    function writeData (idOut, state) {
      var json = {
        idOut: idOut,
        state: state
      }

      var promised = $http.post('/m/u/writeData', json)
      promised.then(function success (response) {
        console.log('data: ',response.data)
        if (response.data.error == 0) {
          //TODO comprobar la respuesta que se haya hecho bien el cambio y actualizar el nuevo estado en la pantalla
         } else {
         console.log('Error: ',response.data)
         }

      }, function failed (data) {

      })
    }

  }

})()
