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
        //TODO crear función que lea en bucle todos los valores y estados

        $scope.stateRoof = 'DESCONOCIDO'
        $scope.stateWall = 'DESCONOCIDO'
        $scope.stateVentilador = 'PARADO'
        $scope.stateResistencia = 'APAGADA'

        $scope.temperature = 24.5




        /*-----------------------------
         ----------- Buttons ----------
         ------------------------------ */

        $scope.changeVentilador = function (data) {
            var json = {value: data.from}
            var promised = $http.post('/m/u/changeVentilador', json)
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

        $scope.changeResistencia = function (data) {
            var json = {value: data.from}
            var promised = $http.post('/m/u/changeResistencia', json)
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

        $scope.clickOpen = function () {
            $scope.stateRoof = 'ABRIENDO...'

            var promised = $http.post('/m/u/openRoof')
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

        $scope.clickClose = function () {
            $scope.stateRoof = 'CERRANDO...'

            var promised = $http.post('/m/u/closeRoof')
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

        $scope.clickStopRoof = function () {
            $scope.stateRoof = 'PARADO'

            var promised = $http.post('/m/u/stopRoof')
            promised.then(function success(response) {

                if (response.data.error == 0) {
                    //TODO comprobar la respuesta que se haya hecho bien el cambio y actualizar el nuevo estado en la pantalla

                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })
        }

        $scope.clickMoveRight = function () {
            $scope.stateWall = 'MOVIENDO A LA DERECHA...'

            var promised = $http.post('/m/u/moveRight')
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

        $scope.clickMoveLeft = function () {
            $scope.stateWall = 'MOVIENDO A LA IZQUIERDA...'

            var promised = $http.post('/m/u/moveLeft')
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

        $scope.clickStopWall = function () {
            $scope.stateWall = 'PARADO'

            var promised = $http.post('/m/u/stopWall')
            promised.then(function success(response) {

                if (response.data.error == 0) {
                    //TODO comprobar la respuesta que se haya hecho bien el cambio y actualizar el nuevo estado en la pantalla

                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })
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