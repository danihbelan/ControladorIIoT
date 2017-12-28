/**
 * Created by danihbelan on 26/12/2017.
 */

angular.module('myApp').controller("loginLogin", ['$scope', '$q', '$http', '$window',
	function($scope, $q, $http, $window) {
		$scope.user = {};
		$scope.errorLogin = false;
		var csrfKey;

		/**
		 * Inicializador del controller
		 */
		$scope.initController = function(csurf){
			csrfKey = csurf;
		};


		$scope.clickLogin = function(){
			if($scope.form.$valid){
				// Preparamos el JSON a enviar
				var jsonSend = {
					name: $scope.user.name,
					pass: $scope.user.password,
					_csrf: csrfKey
				};

				var promised = $http.post('/m/g/login', jsonSend, default_HTTP);
				promised.then(function success(response) {
					// Si no hay error
					var user;
					var data = response.data;

					if(data.error == 0){
						// Guardamos el usuario en sesion
						user = data.result;
            // Accedemos a la pagina principal
            $window.location.href = "/user/index";

					//TODO Definir los errores
					}else if(data.error == 100 ||
						data.error == 111 ||
						data.error == 110){

						dialog_error("Error",data.description)

					}else if(data.error == 99) {
						dialog_error("Usuario no validado",data.description)

					}else{
						dialog_errorResponse(data)
					}

				}, function error(data) {
					dialog_error_desconocido(data.status)
				});

			}
		};

	}
]);



