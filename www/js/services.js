"use strict";

var Ref = new Firebase("https://firetubes.firebaseio.com/");


newl.factory("Allob", function($firebaseObject) {  
  return $firebaseObject(Ref);
})

newl.factory("Allar", function($firebaseArray) {  
  return $firebaseArray(Ref);
})


