(function () {
  'use strict';

  angular.module('BlurAdmin.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($http, $scope, $state) {

    $scope.initController = function () {
      console.log('Se inicia el controlador')
    }

    $scope.clickLogin = function () {
      console.log('click login')
      var datosUser = {
        'mail': $scope.mail,
        'password': $scope.password
      }


        var promised = $http.post('/loginForm', datosUser)
        promised.then(function success(response) {

            if (response.data.error == 0) {
                console.log('Correcto')
                //Redireccion a /admin

            } else {
                console.log('Error: ', response.data)
            }

        }, function failed(data) {

        })

    }

  }

})();
