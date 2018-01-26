(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($http, $scope, localStorage, $state) {
        //Auto Login

        var datosUser = {
            "user": {"id": 1, "dni": "12345678A", "StrNombre": "NombreAdmin", "StrEmail": "admin@casosclinicos.com"},
            "token": "1234567890",
            "ccOpen": [],
            "datas": []
        };

        var idUserAutoLogin = 1;
        var datosUser;
        localStorage.setObject('dataUser', datosUser);
        //localStorage.clear();
/*
        $http.post("//localhost:4000/api/readData", {"id": idUserAutoLogin, "token": "1234567890"})
            .then(function (response) {
                    if (response.data.error === 0) {
                        datosUser = response.data.result;
                        //console.log(datosUser);
                        localStorage.setObject('dataUser', datosUser);
                        $state.go('main.dashboard');
                    }
                    else {
                        console.log("Error: " + response.data.error);
                    }
                }, function (response) {
                    console.log("Error: " + response.data.error);
                }
            );

        //$state.go('main.dashboard');

        //Fin Auto Login
        */
      $state.go('main.dashboard');
/*
        var vm = this;
        vm.login = login;
        init();
        function init() {
            localStorage.clear();
        }

        function login() {
            var datosUser = {
                "user": vm.user,
                "password": vm.password
            };
            
            $http.post("//localhost:4000/api/login", datosUser)
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
                )
        }
*/
    }
})();