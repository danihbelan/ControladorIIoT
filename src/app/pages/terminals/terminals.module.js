/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.terminals', [])
      .config(routeConfig)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('terminals', {
          url: '/terminals',
          title: 'Terminals',
          templateUrl: 'app/pages/terminals/terminals.html',
          controller: 'TerminalsPageCtrl',
        });
  }

})();
