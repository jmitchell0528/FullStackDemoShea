const emailCtrl = require('./emailCtrl')

module.exports = app => {
  app.get('/api/emails', emailCtrl.getEmails);
  app.delete('/api/emails/:id', emailCtrl.deleteEmail);
  app.post('/api/emails', emailCtrl.postEmail)
}
