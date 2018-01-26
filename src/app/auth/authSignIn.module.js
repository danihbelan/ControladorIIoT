(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('authSignIn', {
                url: '/authSignIn',
                templateUrl: 'app/pages/authSignIn/authSignIn.html',
                title: 'Login',
                controller: 'authSignInCtrl',
                sidebarMeta: {
                    order: 800
                },
                authenticate: false
            });
    }

})();