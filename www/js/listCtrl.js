"use strict";

//---------------------------------------------list controller-----------------------------//
newl.controller("DataCtrl", function ($scope, $http, $state , $firebase , $ionicHistory, $ionicLoading ,Allob ,Allar ) {
   
     $scope.whichartist = $state.params.aId;
     console.log($scope.whichartist);
     $scope.data = { showDelete: false, showReorder: false};
     

      // $scope.artists = Allar;
      // console.log($scope.artists);
   
      Allar.$loaded(
      function(x) {
        $scope.hide($ionicLoading);  
        $scope.artists = Allar;
        //console.log($scope.artists);
      }, function(error) {
        console.error("Error:", error);
      });

      

      $scope.doRefresh = function() {
             var obj = Allar;
             $scope.artists =obj;
             $scope.$broadcast('scroll.refreshComplete');
        
      };

      $scope.toggleStar = function(item) {     
          item.star = !item.star;
          if(item.star) {   
                console.log(item)      
                 //fb.child('bb').push(item);
          }
      };


      $scope.onItemDelete = function(item) {
          console.log(item);
          $scope.artists.splice($scope.artists.indexOf(item) , 1);
         
      };

      $scope.moveItem = function(item, fromIndex, toIndex) {
          $scope.artists.splice(fromIndex, 1);
          $scope.artists.splice(toIndex, 0 , item);

      };


      new Share(".share-button");

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

    $scope.show($ionicLoading);
   
});