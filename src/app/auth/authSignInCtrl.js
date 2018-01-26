(function () {
  'use strict';

  angular.module('BlurAdmin.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($http, $scope, localStorage, $state) {

    $scope.initController = function () {
      console.log('se inicia')
      localStorage.clear()
    }

    $scope.login = function () {
      var datosUser = {
        'user': $scope.user,
        'password': $scope.password
      }
      console.log(datosUser)

      /*$http.post("//localhost:4000/api/login", datosUser)
          .then(function (response) {
                  if (response.data.error === 0) {
                      localStorage.setObject('dataUser', response.data.result);
                      $state.go('main.dashboard');
                  }
                  else {
                      console.log("Error: " + response.data.error);
                  }
              }, function (response) {
                  console.log("Error: " + response.data.error);
              }
          )*/
    }

  }
})();
