angular.module("app", ['ui.router'])
.config( ( $stateProvider, $urlRouterProvider ) => {

  /* Set home route */
  $urlRouterProvider.otherwise( "/login" );
  $stateProvider
  .state( "login", {
      url: "/login"
    , templateUrl: `./src/views/login/login.html`
    , controller : "loginCtrl"
    , resolve: {
      isLoggedin: function(loginService, $state){
        loginService.isLoggedin().then(response => {
          if (response.data.isLoggedin){
            $state.go('inbox')
            return true;
          }
          else {
            return false;
          }
        })
      }
    }
  } )
  .state( "inbox", {
      url: "/inbox"
    , templateUrl: `./src/views/inbox/inbox.html`
    , controller : "inboxCtrl"
    , resolve: {
      emails: function(loginService, $state, inboxService){
        return new Promise(function(res, rej){
          if (loginService.loggedIn){
            inboxService.getEmails().then(emails => {
              res(emails.data);
            })
          }
          else{
            rej()
          }
        }).catch(err => $state.go('login'))
      }
    }
  } )
  .state( "compose", {
      url: "/compose/:id"
    , templateUrl: `./src/views/compose/compose.html`
    , controller : "composeCtrl"
    , resolve: {
      isLoggedin: function(loginService, $state){
        return new Promise((res, rej)=> {
          if (loginService.loggedIn){
              res();
            }
            rej()
        }).catch((err) => {
          $state.go('login')
        })
        }
      }
  } )
} )
