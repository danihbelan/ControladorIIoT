(function () {
    'use strict';

    angular.module('BlurAdmin.authSignIn', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('authSignIn', {
                url: '/authSignIn',
                templateUrl: 'app/auth/authSignIn/authSignIn.html',
                title: 'Login',
                controller: 'authSignInCtrl',
                sidebarMeta: {
                    order: 800
                },
                authenticate: false
            });
    }

})();