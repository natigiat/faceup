"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("settingsController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading ,$location, Session){

  var com = $location.path().split("/")[3]||"Unknown";
  var user = $location.path().split("/")[4]||"Unknown";

  $scope.user = Session.username(user);
  $scope.com = Session.comname(com);
  console.log(Session.ref(com , user));


  $ionicLoading.hide();


  // $scope.today = moment().lang("he").format('dddd');

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
