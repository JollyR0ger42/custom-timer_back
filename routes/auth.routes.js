const {checkDbStatus} = require.main.require('./middleware')
const {dbStatus, User} = require.main.require('./controllers')

module.exports = (app) => {
  app.post('/auth/signup',
    checkDbStatus(dbStatus),
    async (req, res) => {
      const user = await User.createUser(req.body)
      if (user) res.send({message: 'signup success'})
      else res.send({message: 'User exist'})
    }
  )
  
  app.post('/auth/signin',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send({action: 'signup'})
    }
  )
}

