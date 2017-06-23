angular.module("app").controller("inboxCtrl", function($scope, emails, $state, inboxService){
  $scope.emails = emails;
  $scope.selectEmail = function(email){
    $scope.selectedEmail = email;
  }
  $scope.reply = function(id){
    $state.go("compose", {id: id})
  }
  $scope.delete = function(id){
    inboxService.deleteEmail(id).then(res=>{
      $scope.selectedEmail = null;
      $scope.emails = res.data
    });
  }
})
