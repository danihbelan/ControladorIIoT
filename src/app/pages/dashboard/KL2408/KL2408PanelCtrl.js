/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('KL2408PanelCtrl', KL2408PanelCtrl);

  /** @ngInject */
  function KL2408PanelCtrl() {

    initController()

    function initController () {
      console.log('Se inicia')
    };

    var vm = this;

    vm.data = {
      o1: true,
      o2: false,
      o3: true,
      o4: true,
      o5: false,
      o6: false,
      o7: false,
      o8: false
    };

    vm.switches = {
      s1: true,
      s2: false,
      s3: true,
      s4: true,
      s5: false,
      s6: false,
      s7: false,
      s8: false
    };
  }

})();
