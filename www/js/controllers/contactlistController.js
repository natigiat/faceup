"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("contactlistController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout, $cordovaContacts ,$ionicLoading){

    $scope.getContactList = function() {

      $cordovaContacts.find({filter: ''}).then(function(result){
        $scope.contacts = result;
      },function(error){
          alert(error);
      })
     
    };

});
