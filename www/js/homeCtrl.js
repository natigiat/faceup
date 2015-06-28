"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("homeController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading){


  $ionicLoading.hide();

  $scope.today = moment().lang("he").format('dddd');

  //----------------ionic loader --------------------------------
  $scope.show = function() {
      $ionicLoading.show({
        animation: 'fade-in',
        maxWidth: 200,
        showDelay: 0,
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });
  };

  $scope.hide = function(){
      $ionicLoading.hide();
  };        


});
