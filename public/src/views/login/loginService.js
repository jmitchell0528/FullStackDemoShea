angular.module("app").service("loginService", function($http){
  this.loggedIn = false;
  this.isLoggedin = function() {
    return $http.get('/api/isLoggedin').then(res => {
      this.loggedIn = res.data.isLoggedin;
      return res;
    })
  }
})
