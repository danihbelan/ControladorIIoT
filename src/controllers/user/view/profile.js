/**
 * Created by danihbelan on 27/12/17.
 */

angular.module('myApp').controller("userViewProfile", ['$scope', '$http', '$location', '$timeout', 'lodash', '$q', '$mdDialog', 'Upload', '$rootScope',
  function($scope, $http, $location, $timeout, lodash, $q, $mdDialog, Upload, $rootScope) {
    var backUpActivities = [];

    $scope.days = secuencia(1,31);
    $scope.months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    $scope.years = secuencia(2016,1930);
    $scope.inputBirthday = {};
    $scope.errors = {};
    var csrf_key;
    $scope.urlImage;
    $scope.urlChanged;
    $scope.changePass = {}
    var imgChanged;

    $scope.initController = function (csrf) {
      saveLocation($scope, $location.path())
      $scope.setTitleHead("Perfil");
      csrf_key = csrf;
      if($scope.user.picture){
        $scope.urlImage = "/photo/user/"+$scope.user.picture+".jpg?" + new Date().getTime();
      }

      $scope.newUser = lodash.cloneDeep($scope.user);
      if($scope.user.birthday){
        $scope.inputBirthday.day = $scope.user.birthday.getDate();
        $scope.inputBirthday.month = $scope.user.birthday.getMonth()+1;
        $scope.inputBirthday.year = $scope.user.birthday.getFullYear();
      }

    };

    $scope.changeImage = function(image){
      var promised2 = show_dialog($q, $http, $mdDialog, {
        templateURL: '/dialog/general/modal/edit_photo',
        parent: angular.element(document.body),
        controller : 'generalModalEditPhoto',
        disableParentScroll: false,
        clickOutsideToClose:true,
        locals: {
          image: image
        }
      });

      promised2.then(function success(result){
        if(result){
          $scope.urlChanged = result.croppedDataUrl;
          imgChanged = Upload.dataUrltoBlob(result.croppedDataUrl, result.picFileName);
        }

      }, function cancell(err){

      });
    };

    /*--------------------------------
     ----------- Funciones -----------
     --------------------------------- */

    $scope.clickSave = function () {
      if(!$scope.form.$valid){
        return;
      }

      //Comprobamos las claces
      if($scope.changePass.newPass){
        $scope.errors.password = $scope.changePass.newPass != $scope.changePass.repPass;
      }

      var year = $scope.inputBirthday.year||"";
      var month = $scope.inputBirthday.month||"";
      var day = $scope.inputBirthday.day||"";
      var text = year+"-"+month+"-"+day;


      //comprobamos el cumpleaños y que existe
      if(text.length>4){
        var date = moment(text, "YYYY-M-D");
        $scope.user.birthday = $scope.user.birthday || new Date();

        if(date.isValid()){
          if(date.date() == $scope.user.birthday.getDate() &&
            date.month() == $scope.user.birthday.getMonth() &&
            date.year() == $scope.user.birthday.getFullYear() ){

            $scope.newUser.birthday = $scope.user.birthday;
          }else{
            $scope.newUser.birthday = moment().year(year).month(month-1).date(day).toDate();
          }

          $scope.errors.errorBirthday = false;
        }else{
          $scope.newUser.birthday = null;
          $scope.errors.errorBirthday = true;
        }
      }

      if(angular.equals($scope.user, $scope.newUser) && !imgChanged && !$scope.changePass.newPass){
        dialog_success_modificacion();
      }else{

        if(!$scope.errors.errorBirthday && !$scope.errors.password) {
          editProfile();
        }
      }

    };

    $scope.getColorBackground = function(text){
      return getColor(text.hashCode());
    };

    /*--------------------------------
     ------------ Updates ------------
     --------------------------------- */


    function editProfile(){
      var birh;
      try{
        birh =  $scope.newUser.birthday.getFullYear()+"/"+($scope.newUser.birthday.getMonth()+1)+"/"+$scope.newUser.birthday.getDate()
      }catch (e){
      }

      var json = {
        name : $scope.newUser.name,
        last_name_1 : $scope.newUser.last_name_1,
        last_name_2 : $scope.newUser.last_name_2,
        phone :$scope.newUser.phone,
        sex : $scope.newUser.sex == 'null'  ? null : $scope.newUser.sex,
        birthday : birh,
        password : $scope.changePass.newPass,
        file: imgChanged
      };

      var promised = Upload.upload({
        url: "/m/c/editProfile",
        data: json,
        headers:{"X-CSRF-Token":csrf_key}
      });

      promised.then(function (resp) {
        if(resp.data.error == 0){
          $scope.newUser.picture = resp.data.result;
          $scope.changePass.newPass = "";
          $scope.changePass.repPass = "";
          $scope.user = lodash.cloneDeep($scope.newUser);
          dialog_success_modificacion();

        }else{
          dialog_errorResponse(resp.data)
        }
      }, function (resp) {

      }, function (evt) {
        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      });

      // evitamos el pestañeo
      loadingDelay($timeout, promised, "Subiendo perfil...");
    }


    function secuencia(min, max){
      var out = [];
      if(min<max){
        for(var i=min; i<=max; i++){
          out.push(i);
        }
      }else{
        for(var i=min; i>=max; i--){
          out.push(i);
        }
      }

      return out;
    }


  }
]);
