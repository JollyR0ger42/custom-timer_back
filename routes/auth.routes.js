const {checkDbStatus} = require.main.require('./middleware')
const {dbStatus, User} = require.main.require('./controllers')

module.exports = (app) => {
  app.post('/auth/signup',
    // checkDbStatus(dbStatus),
    async (req, res) => {
      User.createUser(req.body)
      res.send({action: 'signup'})
    }
  )
  
  app.post('/auth/signin',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send({action: 'signup'})
    }
  )
}

