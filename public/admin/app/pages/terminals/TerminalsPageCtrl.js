/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
    angular.module('BlurAdmin.pages.terminals')
        .controller('TerminalsPageCtrl', TerminalsPageCtrl);

    /** @ngInject */
    function TerminalsPageCtrl($scope, $http, fileReader, $filter, $uibModal) {
        $scope.roofVar;
        $scope.wallVar;
        $scope.resistencia;
        $scope.ventilador;
        $scope.termometro;

        var arrayVariables;

        getVariables()

        //Los datos se han introducido de forma manual, en el futoro se hara de
        // forma automatizada a partir de algun archivo de configuración
        $scope.OUT_BOOL = ['.OUT_BOOL_1', '.OUT_BOOL_2', '.OUT_BOOL_3', '.OUT_BOOL_4',
            '.OUT_BOOL_5', '.OUT_BOOL_6', '.OUT_BOOL_7', '.OUT_BOOL_8'];

        $scope.IN_BOOL = ['.IN_BOOL_1', '.IN_BOOL_2', '.IN_BOOL_3', '.ININ_BOOL_4',
            '.IN_BOOL_5', '.IN_BOOL_6', '.IN_BOOL_7', '.IN_BOOL_8'];

        $scope.OUT_INT = ['.OUT_INT_1', '.OUT_INT_2'];

        $scope.IN_INT = ['.IN_INT_1', '.IN_INT_2'];


        $scope.terminals = [
            {
                id: 0,
                terminal: 'Term 2',
                name: 'EL2004',
                ports: [
                    {id: 1, name: 'Output 1', var: '.OUT_BOOL_1', type: 'BIT', in_out: 'Output'},
                    {id: 2, name: 'Output 2', var: '.OUT_BOOL_2', type: 'BIT', in_out: 'Output'},
                    {id: 3, name: 'Output 3', var: '.OUT_BOOL_3', type: 'BIT', in_out: 'Output'},
                    {id: 4, name: 'Output 4', var: '.OUT_BOOL_4', type: 'BIT', in_out: 'Output'}
                ]
            },
            {
                id: 1,
                terminal: 'Term 3',
                name: 'EL2004',
                ports: [
                    {id: 1, name: 'Output 1', var: '.OUT_BOOL_5', type: 'BIT', in_out: 'Output'},
                    {id: 2, name: 'Output 2', var: '.OUT_BOOL_6', type: 'BIT', in_out: 'Output'},
                    {id: 3, name: 'Output 3', var: '.OUT_BOOL_7', type: 'BIT', in_out: 'Output'},
                    {id: 4, name: 'Output 4', var: '.OUT_BOOL_8', type: 'BIT', in_out: 'Output'}
                ]
            },
            {
                id: 2,
                terminal: 'Term 4',
                name: 'EL1014',
                ports: [
                    {id: 1, name: 'Input 1', var: '.IN_BOOL_1', type: 'BIT', in_out: 'Input'},
                    {id: 2, name: 'Input 2', var: '.IN_BOOL_2', type: 'BIT', in_out: 'Input'},
                    {id: 3, name: 'Input 3', var: '.IN_BOOL_3', type: 'BIT', in_out: 'Input'},
                    {id: 4, name: 'Input 4', var: '.IN_BOOL_4', type: 'BIT', in_out: 'Input'}
                ]
            },
            {
                id: 3,
                terminal: 'Term 5',
                name: 'EL1014',
                ports: [
                    {id: 1, name: 'Input 1', var: '.IN_BOOL_5', type: 'BIT', in_out: 'Input'},
                    {id: 2, name: 'Input 2', var: '.IN_BOOL_6', type: 'BIT', in_out: 'Input'},
                    {id: 3, name: 'Input 3', var: '.IN_BOOL_7', type: 'BIT', in_out: 'Input'},
                    {id: 4, name: 'Input 4', var: '.IN_BOOL_8', type: 'BIT', in_out: 'Input'}
                ]
            },
            {
                id: 4,
                terminal: 'Term 6',
                name: 'EL3052',
                ports: [
                    {id: 1, name: 'Value 1', var: '.IN_INT_1', type: 'INT', in_out: 'Input'},
                    {id: 2, name: 'Value 2', var: '.IN_INT_2', type: 'INT', in_out: 'Input'}
                ]
            },
            {
                id: 5,
                terminal: 'Term 7',
                name: 'EL4022',
                ports: [
                    {id: 1, name: 'Analog output 1', var: '.OUT_INT_1', type: 'INT', in_out: 'Output'},
                    {id: 2, name: 'Analog output 2', var: '.OUT_INT_2', type: 'INT', in_out: 'Output'}
                ]
            }
        ]


        /*-----------------------------
         ----------- Buttons ----------
         ------------------------------ */

        /**
         * Función que responde al botón "Update data"
         */
        $scope.clickUpdateData = function (idTerm) {


        }



        /*--------------------------------
         ---------- Updates PLC ----------
         --------------------------------- */

        function getVariables() {

            var promised = $http.post('/m/u/getVariables')
            promised.then(function success(response) {

                if (response.data.error == 0) {
                    arrayVariables = response.data.result

                    $scope.roofVar = arrayVariables.roof
                    $scope.wallVar = arrayVariables.wall
                    $scope.resistencia = arrayVariables.res
                    $scope.ventilador = arrayVariables.vent
                    $scope.termometro = arrayVariables.term


                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })
        }

        function setVariables() {
            var json = {
                roof: $scope.roofVar,
                wall: $scope.wallVar,
                res: $scope.resistencia,
                vent: $scope.ventilador,
                term: $scope.termometro}

            var promised = $http.post('/m/u/setVariables', json)
            promised.then(function success(response) {

                if (response.data.error == 0) {

                } else {
                    console.log('Error: ', response.data)
                }

            }, function failed(data) {

            })
        }
    }

})();
