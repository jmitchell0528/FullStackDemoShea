angular.module("app").controller("composeCtrl", function($scope, $state, inboxService, composeService){
  let email = inboxService.emails.find(c=>c.id == $state.params.id);
  $scope.email_title = `Re: ${email.email_title}`
  $scope.emailText = `





From: ${email.full_name}, <${email.email_address}>,
Date: ${email.date},
Subject: ${email.email_title}
${email.email_body}`;

  $scope.cancel = function(){
    $state.go('inbox')
  }
  $scope.send = function(){
    let newEmail = {
        date: new Date()
      , email_address: "Shea@email.com"
      , email_body: $scope.emailText
      , email_id: email.id
      , email_title: $scope.email_title
      , full_name: 'Shea Close'
    }
    composeService.sendEmail(newEmail).then(suc=>{
      $state.go('inbox')
    })
  }
})
