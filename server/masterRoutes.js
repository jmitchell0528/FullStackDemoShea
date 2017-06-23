const loginRoute = require('./features/login/loginRoute');
const emailRoute = require('./features/email/emailRoute')

module.exports = app => {
  loginRoute(app);
  emailRoute(app);
}
