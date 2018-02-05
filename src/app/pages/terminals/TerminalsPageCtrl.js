/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.terminals')
    .controller('TerminalsPageCtrl', TerminalsPageCtrl);

    /** @ngInject */
  function TerminalsPageCtrl($scope, $http,fileReader, $filter, $uibModal) {

      //TODO Carga los datos con los terminales y leer los estados
      $scope.terminals = [
          {
              id: 0,
              name: 'EL2004',
              terminal: 'Term 2',
              ports: [
                  {id: 1, name: 'Output 1', var: '.OUT_BOOL_1', state: false, newState: false},
                  {id: 2, name: 'Output 2', var: '.OUT_BOOL_2', state: false, newState: false},
                  {id: 3, name: 'Output 3', var: '.OUT_BOOL_3', state: false, newState: false},
                  {id: 4, name: 'Output 4', var: '.OUT_BOOL_4', state: false, newState: false}
              ]
          },
          {
              id: 1,
              name: 'EL2004',
              terminal: 'Term 3',
              ports: [
                  {id: 1, name: 'Output 1', var: '.OUT_BOOL_5', state: false, newState: false},
                  {id: 2, name: 'Output 2', var: '.OUT_BOOL_6', state: false, newState: false},
                  {id: 3, name: 'Output 3', var: '.OUT_BOOL_7', state: false, newState: false},
                  {id: 4, name: 'Output 4', var: '.OUT_BOOL_8', state: false, newState: false}
              ]
          },
          {
              id: 2,
              name: 'EL1014',
              terminal: 'Term 4',
              ports: [
                  {id: 1, name: 'Input 1', var: '.IN_BOOL_1', state: false},
                  {id: 2, name: 'Input 2', var: '.IN_BOOL_2', state: false},
                  {id: 3, name: 'Input 3', var: '.IN_BOOL_3', state: false},
                  {id: 4, name: 'Input 4', var: '.IN_BOOL_4', state: false}
              ]
          },
          {
              id: 3,
              name: 'EL1014',
              terminal: 'Term 5',
              ports: [
                  {id: 1, name: 'Input 1', var: '.IN_BOOL_5', state: false},
                  {id: 2, name: 'Input 2', var: '.IN_BOOL_6', state: false},
                  {id: 3, name: 'Input 3', var: '.IN_BOOL_7', state: false},
                  {id: 4, name: 'Input 4', var: '.IN_BOOL_8', state: false}
              ]
          }
      ]


      /*-----------------------------
       ----------- Buttons ----------
       ------------------------------ */

      /**
       * Función que responde al botón "Update data"
       * Se llama a la función "readData()" para cada una de las salidas
       */
      $scope.clickReadData = function (idTerm) {
          /*angular.forEach($scope.data, function (out) {
              readData(out.id)
          });*/
          readData($scope.data[0].id)
      }

      /**
       * Función que responde al botón "Change data"
       * Se llama a la función "writeData()" para cada una de las salidas
       */
      $scope.clickWriteData = function (idTerm) {
          var ids = []
          var states = []
          var data = $scope.terminals[idTerm].ports

          angular.forEach(data, function (port) {
              ids.push(port.id)
              states.push(port.newState)
          });

          writeData(ids, states)
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
       * @param ids
       * @param states
       */
      function writeData(ids, states) {
          var json = {
              ids: ids,
              states: states
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
