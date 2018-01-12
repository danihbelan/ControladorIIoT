/**
 * Created by danihbelan on 28/12/2017.
 */

angular.module('myApp').controller("userViewGeneralData", ['$scope', '$q', '$http', '$location','$timeout',
	function($scope, $q, $http, $location, $timeout) {
		var csrfKey;

    $scope.data = {
      o1: false,
      o2: false,
      o3: false,
      o4: false,
      o5: false,
      o6: false,
      o7: false,
      o8: false
    }

		/**
		 * Inicializador del controller
		 */
		$scope.initController = function (csurf) {
			csrfKey = csurf;
			startPlcClient()
		};

    function startPlcClient(){
      var promised = $http.get("/m/u/startClient",
        {
          _csrf: csrfKey
        },
        default_HTTP);
      promised.then(function successCallback(response){
        dialog_close();
      }, function errorCallback(data) {
        dialog_error_desconocido(data.status)
      });

      loadingDelay($timeout, promised, "Cargando cliente softPLC");
    }

		/*----------------------------
		 ----------- Buttons ----------
		 ------------------------------ */

		$scope.clickWriteData = function () {
      writeData()
    }

    $scope.clickReadData = function () {
      readData()
    }


		/*--------------------------------
		 ------------ Updates ------------
		 --------------------------------- */

		function readData () {
      $http.get('/m/u/readData',
        {
          _csrf: csrfKey
        }, default_HTTP)
        .then(function success (response) {
					/*if (response.data.error == 0) {

					 } else {
					 dialog_errorResponse(response.data)
					 }*/
          //implementar teniendo en cuenta el campo error de la respuesta
          console.log('Leyendo datos: ',response)

        }, function failed (data) {

        })
    }

    function writeData () {
      var json = {
        idOutput: 1,
        state: $scope.data.o1
      }

      var promised = $http.post('/m/u/writeData', json, default_HTTP)
      promised.then(function success (response) {
				/*if (response.data.error == 0) {

				 } else {
				 dialog_errorResponse(response.data)
				 }*/
        //implementar teniendo en cuenta el campo error de la respuesta
        console.log('Escribiendo datos: ',response)

      }, function failed (data) {

      })
    }

	}
]);