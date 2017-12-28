/**
 * Created by danihbelan on 27/12/2017.
 */

angular.module('myApp').controller("user", ['$scope', '$q', '$http','$location', '$rootScope',
	function($scope, $q, $http,$location, $rootScope) {

		//- Variable user que estara durante toda la sesion
		$scope.user = {};

		//- CSRF para el logout
		$scope.csrfKey = "";


		/**
		 * Inicializador del controller
		 */
		$scope.initController = function (user, csrf) {

			$scope.csrfKey = csrf;
			$scope.user = JSON.parse(user);

			$scope.user.views = [];
			if ($scope.user.urlRefresh) {
				$location.path($scope.user.urlRefresh)
			} else {
				$location.path('/user/generalData')
			}
		};

		$scope.resetSession = function(){
			$scope.user.generalData = null;
			$scope.resources = null;
		};

		$scope.setTitleHead = function(title){
			$scope.titleHeader = title;
		};

		/**
		 * Ponemos la funcion en el Scope para que pueda ser ejecutado por cualquier controller superior.
		 *
		 * Se descarga los recursos que seran utilizados en general por todas las vistas
		 *
		 * @param callbackOk	Se ejecuta si la ejecucion ha sido correcta
		 * @param callbackError	Se ejecuta si ha habido un error y lo pasa por parametro
		 */
		$scope.initUser = function(callbackOk, callbackError){
			if($scope.resources){
				callbackOk();
				return;
			}
			loading("Cargando recursos...");

			$q.all({
				resources: $http.get("/m/u/getResources", default_HTTP)

			}).then(function (result) {
				var resResources = result.resources.data;

				if(resResources.error == 0){
					dialog_close();
					$scope.resources = resResources.result;

					callbackOk();

				}else{
					var dataError = {};
					if(resResources.error != 0){
						dataError = resResources;
					}

					callbackError = callbackError || errorResponse;
					dialog_errorResponse(dataError, callbackError);

				}
			});

			function errorResponse(){
				$rootScope.$apply(function() {
					$location.path(lastPage($scope));
				});
			}

		};
	}
]);