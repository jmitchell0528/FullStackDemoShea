const   express = require('express'),
 				cors = require('cors'),
 				bodyParser = require('body-parser'),
 				port = 3000,
 				app = express(),
        massive = require('massive'),
        masterRoutes = require('./server/masterRoutes'),
        session = require('express-session'),
        passport = require("passport"),
	      Strategy = require('passport-facebook').Strategy,
        config = require('./server/config')

app.use(cors())
app.use(bodyParser.json())
app.use(session(config.session) );
app.use(passport.initialize());
app.use(passport.session());
app.use("/", express.static(__dirname + '/public'));
massive(config.postgres).then(dbInstance => {
  app.set('db', dbInstance)
  // dbInstance.upload_emails();
})
masterRoutes(app);

passport.use(new Strategy( config.Strategy ,
	function(accessToken, refreshToken, profile, cb) {
    profile.id = 1;
    app.set('user', profile)
    return cb(null, profile);
  }));

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/facebook"
}));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



app.listen(port, function() {
  console.log('Listening on port', port)
})
