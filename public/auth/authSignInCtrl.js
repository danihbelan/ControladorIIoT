(function () {
  'use strict';

  angular.module('BlurAdmin.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($http, $scope, $state, $window) {

    $scope.initController = function () {
    }

    $scope.clickLogin = function () {
      var datosUser = {
        'mail': $scope.mail,
        'password': $scope.password
      }


        var promised = $http.post('/loginForm', datosUser)
        promised.then(function success(response) {

            if (response.status == 200) {
                console.log('Valido!')
                //Redireccion a /admin
                $window.location.href = '/admin'

            } else {
                console.log('Error: '+ response.status)
            }

        }, function failed(data) {

        })

    }

  }

})();
