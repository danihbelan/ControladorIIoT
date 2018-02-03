/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
    'use strict'

    angular.module('BlurAdmin.pages.dashboard')
        .controller('KL2408PanelCtrl', KL2408PanelCtrl)

    /** @ngInject */
    function KL2408PanelCtrl($scope, $http, $filter, editableOptions, editableThemes) {

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
         * Leer todos los datos que se muestran
         */
        $scope.initController = function () {
            //TODO Inicializar todas las variables correspondientes
        }


        /*----------------------------
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
         ------------ Updates ------------
         --------------------------------- */

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
         * @param idOut
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

})()
