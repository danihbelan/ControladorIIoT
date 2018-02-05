/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.terminals',
    'BlurAdmin.pages.profile'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('dashboard');

    baSidebarServiceProvider.addStaticItem({
        title: 'Terminals',
        icon: 'fa fa-building',
        stateRef: 'terminals'
    });

    baSidebarServiceProvider.addStaticItem({
      title: 'Profile',
      icon: 'fa fa-user',
      stateRef: 'profile'
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Sign out',
      icon: 'fa fa-power-off'
    });
  }

})();
