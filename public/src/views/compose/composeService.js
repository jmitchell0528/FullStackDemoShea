angular.module("app").service("composeService", function($http){
  this.sendEmail = function(email){
    return $http.post('/api/emails', email);
  }
})
