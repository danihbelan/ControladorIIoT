/**
 * Created by danihbelan on 26/12/2017.
 */

angular.module('myApp',['ngRoute']).config(['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {

       $routeProvider
        // ========= Login ============
            .when("/",{
                templateUrl: "/temp/login/login"
            })

        // ========= User ============
            .when("/user/profile",{
                templateUrl: "/temp/user/profile"
            })
            .when("/user/generalData",{
                templateUrl: "/temp/user/generalData"
            })

        // ========== Otherwise ===========
            .otherwise({
                redirectTo: '/',
                templateUrl: "/temp/login/login"
            });

        $locationProvider.html5Mode(true);
    }
]);