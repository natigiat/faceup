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


     //**
     //first check - if company in service
     //secound check - if password of company currect
     //third check - if user is sing in company
     //fourd check - if password of user currect
     //**
     $scope.login =function (loginForm , name , password,company_name , password_company) {
        $scope.error = '';
        var form = loginForm;

        var usersRef = new Firebase("https://firetubes.firebaseio.com/company/");
        var ref = new Firebase("https://firetubes.firebaseio.com/company/"  + company_name);
        var obj = $firebaseObject(ref);
        var userobj = $firebaseObject(usersRef);

        //first check - if company in service
        if (form.company_name.$valid === false) { 
            $scope.error = 'שם חברה אינו תקין ';
        }else{
            usersRef.once('value', function(snapshot) {
                if (snapshot.hasChild(company_name)) {
                      $scope.error = '';

                      
                      if (form.password_company.$valid === false) { 
                          $scope.error = 'סיסמת חברה אינה תקינה';      
                      }else {
                          //secound check - if password of company currect
                          obj.$bindTo($scope, "data").then(function() {
                            var details = $scope.data;
                            if (details.password == password_company) { 
                              $scope.error = '';

                             //third check - if user is sing in company
                              ref.child("users").once('value', function(snapshot) {
                                if (snapshot.hasChild(name)) {
                                      
                                      //fourd check - if password of user currect
                                      ref.child("users").child(name).once('value', function(snapshot) {
                                      var dataUser = snapshot.val();
                                      var dataUserPass = dataUser.password;
                                      if (dataUserPass === password ){
                                          $scope.show($ionicLoading);
                                          $scope.error = '';
                                          console.log(dataUser.email + "מחובר");
                                          $state.go("tabs.home");
                                      }else {
                                          $scope.error = 'הסיסמא שלך אינה נכונה';
                                      }

                                      });
                                                

                                }else{
                                  $scope.error = 'פרטי החברה נכונים אך אין עובד עם שם כזה';
                                }
                              });

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
        if (form.name.$valid === false) { 
            $scope.error = 'שם משתמש לא תקני';
        }
       };

     

     //company register
     $scope.register =function (email , password ,companyname) {
      
      $scope.show($ionicLoading);

      //set time of register
      var tim = moment().format('l');

      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
        } else {
          $state.go("tabs.home");
        }
      };

      var compRef = fb.child("company/" + companyname);
      compRef.set({
        password  : password , 
        email     : email ,
        date      :   tim 
      },onComplete);


     };



     $scope.registerUser =function (registerUserForm, name , email , password ,companyname , companyPass) {
      
      $scope.error = '';
      

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
                            $scope.show($ionicLoading);

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
