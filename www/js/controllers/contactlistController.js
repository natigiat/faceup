"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("contactlistController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading){

    $scope.getContacts = function() {
      $scope.phoneContacts = [];
      function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          $scope.phoneContacts.push(contact);
        }
      };
      function onError(contactError) {
        alert(contactError);
      };
      var options = {};
      options.multiple = true;
      $cordovaContacts.find(options).then(onSuccess, onError);
    };

});
