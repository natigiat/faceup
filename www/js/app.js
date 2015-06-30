// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var newl = angular.module('starter', ['ionic' , 'firebase' ,'ngAutocomplete' , 'ngCordova' , 'pascalprecht.translate' ]);
var fb = new Firebase("https://firetubes.firebaseio.com/");

newl.run(function($ionicPlatform, $firebaseAuth, $rootScope , $state, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

   var fbAuth = $firebaseAuth(fb);
       //check if user authinticate or not
    fbAuth.$onAuth(function(authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
          $state.go("tabs.list");
        } else {
          console.log("Logged out");
          $state.go("tabs.list");
        }
     });


})

newl.config(function ($stateProvider , $urlRouterProvider , $translateProvider) {
  



  var resolve = {
    auth: function($q, $timeout, Auth, User) {
      var defer = $q.defer();
      var state = this;

      Auth.getCurrentUser().then(function() {
        User.loadCurrentUser().then(function() {
          if (state.name === 'change-password') {
            defer.resolve();
          } else {
            if (User.hasChangedPassword()) {
              defer.resolve();
            } else {
              defer.reject('change-password');
            }
          }
        });
      }, function() {
        $timeout(function() { // See: http://stackoverflow.com/q/24945731/247243
          defer.reject('login');
        }, 250);
      });

      return defer.promise;
    }
  };





  $stateProvider
    .state('tabs' , { 
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })


    //----------------account start --------------------
    .state('account', {
      url: '/account',
      templateUrl: 'templates/account/account.html',
      controller: 'accountController'
    })


    .state('log', {
      url: '/log',
      templateUrl: 'templates/account/log.html',
      controller: 'accountController'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/account/register.html',
      controller: 'accountController'
    })

    .state('registerUser', {
      url: '/registerUser',
      templateUrl: 'templates/account/registerUser.html',
      controller: 'contactController'
    })



    .state('tabs.home' , { 
      url: '/home',
      views: {
        'home-tab' : {  
          templateUrl: 'templates/home.html',
          controller:  'settingsController'
        }
      }
    })

    .state('tabs.list' , { 
      url: '/list',
      views: {
        'list-tab' : {  
          templateUrl: 'templates/list.html',
          controller:  'DataCtrl'
        }
      }
    })

    .state('tabs.details' , { 
      url: '/list/:aId',
      views: {
        'list-tab' : {  
          templateUrl: 'templates/details.html',
          controller:  'DataCtrl'
        },
        authenticate: true
      }
    })


    .state('tabs.favo' , { 
      url: '/favo',
      views: {
        'favo-tab' : {  
          templateUrl: 'templates/favo.html',
          controller:  'contactlistController'
        }
      }
    })


    .state('tabs.reco' , { 
      url: '/reco',
      views: {
        'reco-tab' : {  
          templateUrl: 'templates/reco.html',
          controller:  'DataCtrl'
        }
      }
    })


    .state('tabs.add' , { 
      url: '/add',
      views: {
        'add-tab' : {  
          templateUrl: 'templates/add.html',
          controller:  'chatController'
        }
      }
    });


    $urlRouterProvider.otherwise('/account');
   
})




