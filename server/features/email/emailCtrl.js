module.exports = {
  getEmails(req, res){
    req.app.get('db')
      .run('select * from emails where email_id = $1', [req.app.get('user').id])
      .then(emails=>res.status(200).json(emails))
      .catch(err => res.status(500).json(err));
  },
  deleteEmail(req, res){
    req.app.get('db')
      .delete_email([req.params.id, req.app.get('user').id])
      .then(emails=>{
        return res.status(200).json(emails)
      })
      .catch(err=>{
        return res.status(500).json(err)
      })
  },
  postEmail(req, res){
    req.app.get('db')
      .run('insert into emails (email_id, email_body, email_title , email_address, full_name, date) values ($1,$2,$3,$4,$5,$6)', [req.body.email_id, req.body.email_body, req.body.email_title, req.body.email_address, req.body.full_name, req.body.date] )
      .then(suc=>res.status(200).json(suc))
      .catch(err=>res.status(500).json(err))
  }
}
