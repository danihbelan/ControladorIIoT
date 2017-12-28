/**
 * Created by danihbelan on 27/12/2017.
 */
angular.module('myApp').controller("userHeader", ['$scope', '$mdSidenav', '$window',
	function($scope, $mdSidenav, $window) {

		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
	}
]);

angular.module('myApp').controller("userMenu", ['$scope', '$mdSidenav', '$window', '$location', '$http',
	function($scope, $mdSidenav, $window, $location, $http) {
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};

    $scope.clickPerfil= function(){
    	$location.path('/coordinator/profile');
    };

		$scope.clickGeneralData = function(){
			$location.path('/coordinator/generalData')
		};

		$scope.clickLogOut = function(){
			loading("Desconectando");
			$http.post("/m/g/logout",
				{
					_csrf: $scope.csrfKey
				},
				default_HTTP)
				.then(function successCallback(response){

					$scope.user={};
					$window.location.href = '/';
					dialog_close();

				}, function errorCallback(data) {
					dialog_error_desconocido(data.status)
				})
		};


	}
]);