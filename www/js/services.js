"use strict";

var Ref = new Firebase("https://firetubes.firebaseio.com/");


newl.factory("Allob", function($firebaseObject) {  
  return $firebaseObject(Ref);
})

newl.factory("Allar", function($firebaseArray) {  
  return $firebaseArray(Ref);
})

newl.service("Session", function($http , $location) {  
  
	  this.ref = function(com , user){
	         var compRef = fb.child("company/" + com + "/users/" + user);
	  		 return compRef;
	  };  

	  this.username = function(user){
	  		 return user;
	  };  

	  this.comname = function(com){
	  		 return com;
	  };  


  

})





