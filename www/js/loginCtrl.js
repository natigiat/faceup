"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("loginController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading){

	// $scope.login =function (loginForm , name , password,company_name , password_company) {
     
 //      $scope.error = '';
 //      var form = loginForm;

 //      var usersRef = new Firebase("https://firetubes.firebaseio.com/company/");
 //      var ref = new Firebase("https://firetubes.firebaseio.com/company/"  + company_name);
 //      var obj = $firebaseObject(ref);
 //      var userobj = $firebaseObject(usersRef);

      
 //      if (form.company_name.$valid === false) { 
 //          $scope.error = 'שם חברה אינו תקין ';
 //      }else{
 //          usersRef.once('value', function(snapshot) {
 //              if (snapshot.hasChild(company_name)) {
 //                    $scope.error = '';

 //                    // company password
 //                    if (form.password_company.$valid === false) { 
 //                        $scope.error = 'סיסמת חברה אינה תקינה';      
 //                    }else {
 //                        //check if password of comapny is ok
 //                        obj.$bindTo($scope, "data").then(function() {
 //                          var details = $scope.data;
 //                          if (details.password == password_company) { 
 //                            $scope.error = '';

 //                            ref.child("users").once('value', function(snapshot) {
 //                              if (snapshot.hasChild(name)) {
                                    
 //                                    userobj.$bindTo($scope, "data").then(function() {
 //                                        var user_details = $scope.data;
 //                                        if (user_details == password) {
 //                                             alert("yes");
 //                                        }else {
 //                                           $scope.error = 'פרטי החברה נכונים וגם שם המשתמש אך הסיסמא שגויה';
 //                                        }

 //                                    });

 //                              }else{
 //                                $scope.error = 'פרטי החברה נכונים אך אין עובד עם שם כזה';
 //                              }
 //                            });





 //                          }else{
 //                            $scope.error = 'הסיסמא אינה נכונה';
 //                          }
 //                        });
 //                    }

 //                }else{
 //                    $scope.error = 'שם החברה אינו נמצא במערכת';
 //                }
 //           });
 //      }


 //      // username
 //      if (form.password.$valid === false) { 
 //          $scope.error = 'סיסמת משתמש אינה תקינה';
 //      }

 //      // user rmail
 //      if (form.name.$valid === false) { 
 //          $scope.error = 'שם משתמש לא תקני';
 //      }
 //      // $scope.show($ionicLoading);
 //      // fbAuth.$authWithPassword({
 //      //   email: username,
 //      //   password: password
 //      // }).then(function(authData){
 //      //   $state.go("tabs.list");
 //      // }).catch(function(error){
 //      //   console.error("ERROR:" + error);
 //      //   $scope.error = "ERROR:" + error;
 //      // });
 //     };


});
