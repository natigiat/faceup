"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("accountController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading){
    
     var fbAuth = $firebaseAuth(fb);
     var obj = $firebaseObject(fb);

     

     //check if user authinticate or not
    fbAuth.$onAuth(function(authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
          //$state.go("tabs.list");
        } else {
          console.log("Logged out");
          $state.go("account");
        }
     });



     

     $scope.register =function (email , password ,companyname) {
      
      $scope.show($ionicLoading);

      //set time of register
      var tim = moment().format('l');

      var compRef = fb.child("company/" + companyname);
      compRef.set({
        password  : password , 
        email     : email ,
        date      :   tim 
      })

      fbAuth.$createUser({email: email,password: password}).then(function(userData){
        return fbAuth.$authWithPassword({
          email: email,
          password: password
        });
      }).then(function(authData){
        $state.go("tabs.list");
      }).catch(function(error){
        console.error("ERROR:" + error);
      });
     };


     $scope.registerUser =function (registerUserForm, name , email , password ,companyname , companyPass) {
      
      $scope.error = '';
      // $scope.show($ionicLoading);

      //set time of register
      var tim = moment().format('l');

      //set the form
      var form = registerUserForm ;

      var usersRef = new Firebase("https://firetubes.firebaseio.com/company/");
      var ref = new Firebase("https://firetubes.firebaseio.com/company/"  + companyname);
      var obj = $firebaseObject(ref);
     
   
      // form validation
      
      

      // company name
      if (form.companyname.$valid === false) { 
          $scope.error = 'שם חברה אינו תקין ';
      }else{
          usersRef.once('value', function(snapshot) {
              if (snapshot.hasChild(companyname)) {
                    $scope.error = '';

                    // company password
                    if (form.companyPass.$valid === false) { 
                        $scope.error = 'סיסמת חברה אינה תקינה';      
                    }else {
                        //check if password of comapny is ok
                        obj.$bindTo($scope, "data").then(function() {
                          var details = $scope.data;
                          if (details.password == companyPass) { 
                            $scope.error = '';

                            var onComplete = function(error) {
                              if (error) {
                                console.log('Synchronization failed');
                              } else {
                                $state.go("tabs.home");
                              }
                            };

                            //set company details
                            var compRef = fb.child("company/" + companyname + "/users/" + name);
                            compRef.set({
                                email     : email ,
                                password  : password , 
                                date      :   tim 
                            },onComplete);


                          }else{
                            $scope.error = 'הסיסמא אינה נכונה';
                          }
                        });
                    }

                }else{
                    $scope.error = 'שם החברה אינו נמצא במערכת';
                }
          });
      }

      // username
      if (form.password.$valid === false) { 
          $scope.error = 'סיסמת משתמש אינה תקינה';
      }

      // user rmail
      if (form.email.$valid === false) { 
          $scope.error = 'אימייל לא תקני';
      }

      // user name
      if (form.name.$valid === false) { 
          $scope.error = 'שם משתמש אינו תקין';
      }

      // fbAuth.$createUser({email: email,password: password}).then(function(userData){
      //   return fbAuth.$authWithPassword({
      //     email: email,
      //     password: password
      //   });
      // }).then(function(authData){
      //   $state.go("tabs.list");
      // }).catch(function(error){
      //   console.error("ERROR:" + error);
      // });
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
