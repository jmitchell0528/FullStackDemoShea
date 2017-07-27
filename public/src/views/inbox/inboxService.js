angular.module("app").service("inboxService", function($http){
  this.emails;
  this.getEmails = function(){
    return $http.get('/api/emails').then(res => {
      this.emails = res.data;
      return res
    })
  }
  this.deleteEmail = function(id){
    return $http.delete(`/api/emails/${id}`)
  }
})
