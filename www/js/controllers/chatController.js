
//---------------------------------------------add controller-----------------------------//
newl.controller("chatController" , function($scope, $state,$firebase, $firebaseAuth, $firebaseObject ,$firebaseArray , $cordovaCamera , $ionicLoading){


      $scope.signIn =function(formi)  {

      var form = formi ;
      var fbAuth = $firebaseAuth(fb);
      var obj = $firebaseObject(fb);
      var list = $firebaseArray(fb);


      var getauth = fb.getAuth();
          if(getauth) {

            var userRef = fb.child("users/" + getauth.uid);
            var usersyncArray = $firebaseArray(userRef);
            var email = getauth.password.email;

            var fredNameRef = new Firebase('https://olmaya.firebaseio.com');

            //console.log(form);
            if(form.$valid === true) {
                var name = form.username.$viewValue;
                var emailuser = form.useremail.$viewValue;
                var work = form.userwork.$viewValue;
                var company = form.usercompany.$viewValue;
                var description = form.userdescription.$viewValue;
                var tel = form.usertel.$viewValue;
                var adress = form.useraddress.$viewValue;
                var volume = form.uservolume.$viewValue;

                
                //loading
                $scope.show($ionicLoading);

                //on complete loading info
                var onComplete = function(error) {
                  if (error) {
                    console.log('error');
                  } else {
                    $scope.hide($ionicLoading);  
                    $state.go("tabs.list");
                  }
                };
                
                fredNameRef.child(getauth.uid).set({tel : tel})

                fredNameRef.child(getauth.uid).child("details").set({
                    
                    user         : getauth.uid,
                    name         : name,
                    emailuser    : emailuser,
                    work         : work,
                    company      : company,
                    description  : description,
                    tel          : tel,
                    adress       : adress,
                    volume       : volume
                  
                }, onComplete)

            }else {
               alert("מלא את כל הפרטים");
               //$state.go("account");
            }
            
       };

     };




      //manage upload images
     
      $scope.uploadlogo = function() {
         $scope.logos = [];
          var getauth = fb.getAuth();
            if(getauth) {
              
              var userRef = fb.child(getauth.uid);
              var logosyncArray = $firebaseArray(userRef.child("logos"));
              $scope.logos = logosyncArray;
              //console.log($scope.logos);
            }  
         

         var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                cameraDirection: 1 , 
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
         };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              logosyncArray.$add({logo: imageData});
          }, function(err) {
            console.log("error: " + eroor);
          });
      };


       $scope.uploadimages = function() {
         $scope.images = [];
          var getauth = fb.getAuth();
            if(getauth) {
              
              var userRef = fb.child(getauth.uid);
              var logosyncArray = $firebaseArray(userRef.child("images"));
              $scope.images = logosyncArray;
              //console.log($scope.images);
            }  
         

         var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                cameraDirection: 1 , 
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
         };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              logosyncArray.$add({image: imageData});
          }, function(err) {
            console.log("error: " + eroor);
          });
      };

    
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
