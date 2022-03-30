const {checkDbStatus} = require.main.require('./middleware')
const {dbStatus, User} = require.main.require('./controllers')
const jwt = require('jsonwebtoken')

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
      const user = await User.verifyUser(req.body)
      if (user) {
        const token = jwt.sign(
          {name: user.name},
          process.env.SECRET_KEY,
          {expiresIn: '30d'}
        )
        res.send({
          name: user.name,
          accessToken: token
        })
      }
      else res.send({message: 'Wrong creds'})
    }
  )
}

