/**
 * Created by Georgevik on 28/01/2016.
 */

angular.module('myApp').controller("coordinatorViewGeneralData", ['$scope', '$q', '$http', '$location','$timeout',
	function($scope, $q, $http, $location, $timeout) {
		var csrfKey;

		/**
		 * Inicializador del controller
		 */
		$scope.initController = function (csurf) {
			csrfKey = csurf;
			if(!$scope.user.titulationYear){
				$location.path('/coordinator/titulation')

			}else{
				$scope.initCoordinator(function(){
					if(!$scope.user.generalData){
						downloadGeneralData();
					}
				});
			}
		};

		function downloadGeneralData(){
			var promised = $http.post("/m/c/getGeneralData",
				{
					_csrf: csrfKey
				},
				default_HTTP);
			promised.then(function successCallback(response){
				$scope.user.generalData = response.data.result;
				dialog_close();

			}, function errorCallback(data) {
				dialog_error_desconocido(data.status)
			});

			loadingDelay($timeout, promised, "Obteniendo datos generales");
		}
	}
]);