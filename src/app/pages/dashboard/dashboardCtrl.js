/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages')
      .controller('dashboardCtrl', dashboardCtrl);

  /** @ngInject */
  function dashboardCtrl($scope, $http, $timeout, baConfig, baUtil, $element, layoutPaths) {

    $scope.temperature = 24.5

    $scope.data = [
      {id: 1, name: 'Output 1', state: false, newState: false},
      {id: 2, name: 'Output 2', state: false, newState: false}
    ]


    /*-----------------------------
     ----------- Buttons ----------
     ------------------------------ */

    /**
     * Función que responde al botón "Update data"
     * Se llama a la función "readData()" para cada una de las salidas
     */
    $scope.clickReadData = function () {
      /*angular.forEach($scope.data, function (out) {
          readData(out.id)
      });*/
      readData($scope.data[0].id)
    }

    /**
     * Función que responde al botón "Change data"
     * Se llama a la función "writeData()" para cada una de las salidas
     */
    $scope.clickWriteData = function () {
      /*angular.forEach($scope.data, function (out) {
        writeData(out.id, out.newState)
      });*/
      writeData($scope.data[0].id, $scope.data[0].newState)
    }


    /*--------------------------------
     ---------- Updates PLC ----------
     --------------------------------- */

    /**
     * Funcion que hace una petición POST para leer una entrada/salida digital
     *
     * @param id
     */
    function readData(id) {
      var json = {
        id: id
      }

      var promised = $http.post('/m/u/readData', json)
      promised.then(function success(response) {

        if (response.data.error == 0) {
          //TODO comprobar la respuesta que se haya hecho bien el cambio y actualizar el nuevo estado en la pantalla
          console.log(response.data.result)
        } else {
          console.log('Error: ', response.data)
        }

      }, function failed(data) {

      })
    }

    /**
     * Funcion que hace una petición POST para escribir un dato en una salida
     *
     * @param id
     * @param state
     */
    function writeData(id, state) {
      var json = {
        id: id,
        state: state
      }

      var promised = $http.post('/m/u/writeData', json)
      promised.then(function success(response) {

        if (response.data.error == 0) {
          //TODO comprobar la respuesta que se haya hecho bien el cambio y actualizar el nuevo estado en la pantalla
          console.log(response.data.result)
        } else {
          console.log('Error: ', response.data)
        }

      }, function failed(data) {

      })
    }

  }
})();