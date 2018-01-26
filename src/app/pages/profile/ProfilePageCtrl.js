/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $uibModal) {

    $scope.profile = {
      firstName: 'Daniel',
      lastName1: 'Hernández',
      lastName2: 'Bélanger',
      email: 'dani@ugr.es',
      phone: 666123456
    }

    //If no picture
    $scope.picture = $filter('appImage')('theme/no-photo.png');
    $scope.noPicture = true;

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    $scope.unconnect = function (item) {
      item.href = undefined;
    };


    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

  }

})();
