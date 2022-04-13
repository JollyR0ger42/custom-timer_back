const {checkDbStatus, requiredFields} = require.main.require('./middleware')
const {dbStatus, User} = require.main.require('./controllers')

module.exports = (app) => {
  app.post('/auth/signup',
    checkDbStatus(dbStatus),
    requiredFields(['name', 'password']),
    async (req, res) => {
      const user = await User.createUser(req.body)
      if (user) res.status(201).send({info: 'Signup success'})
      else res.status(400).send({error: 'User exist'})
    }
  )
  
  app.post('/auth/signin',
    checkDbStatus(dbStatus),
    async (req, res) => {
      const user = await User.verifyUser(req.body)
      if (user) {
        const accessToken = User.generateToken({name: user.name})
        res.status(200).send({name: user.name, accessToken})
      }
      else res.status(400).send({error: 'Wrong creds'})
    }
  )
}
