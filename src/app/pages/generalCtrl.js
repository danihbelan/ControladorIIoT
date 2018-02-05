/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages')
      .controller('generalCtrl', generalCtrl);

  /** @ngInject */
  function generalCtrl($scope, $http, $timeout, baConfig, baUtil, $element, layoutPaths) {

    //Iniciamos las variables con el archivo de configuración
      var operations = [
          {id:0, name: 'Abrir techo', type: 1, typeName: 'OutputBool', varAssociate: '.OUT_BOOL_1'},
          {id:1, name: 'Cerrar techo', type: 1, typeName: 'OutputBool', varAssociate: '.OUT_BOOL_1'},
          {id:2, name: 'Acercar pared', type: 1, typeName: 'OutputBool', varAssociate: '.OUT_BOOL_5'},
          {id:3, name: 'Alejar pared', type: 1, typeName: 'OutputBool', varAssociate: '.OUT_BOOL_6'},

          {id:4, name: 'Sensor techo cerrado', type: 2, typeName: 'InputBool', varAssociate: '.IN_BOOL_1'},
          {id:5, name: 'Sensor techo abierto', type: 2, typeName: 'InputBool', varAssociate: '.IN_BOOL_2'},
          {id:6, name: 'Sensor pared cerca', type: 2, typeName: 'InputBool', varAssociate: '.IN_BOOL_5'},
          {id:7, name: 'Sensor pared lejos', type: 2, typeName: 'InputBool', varAssociate: '.IN_BOOL_6'},

          {id:8, name: 'Motor ventilador', type: 3, typeName: 'Output Analog', varAssociate: null},
          {id:9, name: 'Resistencia', type: 3, typeName: 'Output Analog', varAssociate: null},

          {id:10, name: 'Lector temperatura', type: 4, typeName: 'Input Analog', varAssociate: null}
      ]

      var terminals = [
          {
              id: 0,
              name: 'EL2004',
              terminal: 'Term 2',
              ports: [
                  {id: 0, name: 'Output 1', var: '.OUT_BOOL_1', operationAssociate: operations[0]},
                  {id: 1, name: 'Output 2', var: '.OUT_BOOL_2', operationAssociate: operations[1]},
                  {id: 2, name: 'Output 3', var: '.OUT_BOOL_3', operationAssociate: null},
                  {id: 3, name: 'Output 4', var: '.OUT_BOOL_4', operationAssociate: null}
              ]
          },
          {
              id: 1,
              name: 'EL2004',
              terminal: 'Term 3',
              ports: [
                  {id: 0, name: 'Output 1', var: '.OUT_BOOL_5', operationAssociate: operations[2]},
                  {id: 1, name: 'Output 2', var: '.OUT_BOOL_6', operationAssociate: operations[3]},
                  {id: 2, name: 'Output 3', var: '.OUT_BOOL_7', operationAssociate: null},
                  {id: 3, name: 'Output 4', var: '.OUT_BOOL_8', operationAssociate: null}
              ]
          },
          {
              id: 2,
              name: 'EL1014',
              terminal: 'Term 4',
              ports: [
                  {id: 0, name: 'Input 1', var: '.IN_BOOL_1', operationAssociate: operations[4]},
                  {id: 1, name: 'Input 2', var: '.IN_BOOL_2', operationAssociate: operations[5]},
                  {id: 2, name: 'Input 3', var: '.IN_BOOL_3', operationAssociate: null},
                  {id: 3, name: 'Input 4', var: '.IN_BOOL_4', operationAssociate: null}
              ]
          },
          {
              id: 3,
              name: 'EL1014',
              terminal: 'Term 5',
              ports: [
                  {id: 0, name: 'Input 1', var: '.IN_BOOL_5', operationAssociate: operations[6]},
                  {id: 1, name: 'Input 2', var: '.IN_BOOL_6', operationAssociate: operations[7]},
                  {id: 2, name: 'Input 3', var: '.IN_BOOL_7', operationAssociate: null},
                  {id: 3, name: 'Input 4', var: '.IN_BOOL_8', operationAssociate: null}
              ]
          }
      ]

      this.getOperations = function(){
          return operations
      }

      this.getTerminals = function(){
          return terminals
      }

      this.setOperation = function(idtTerminal, idPort, idOperation){
          terminals[idtTerminal].ports[idPort].operationAssociate = operations[idOperation]
      }
  }
})();