const {checkDbStatus, verifyToken} = require.main.require('./middleware')
const {dbStatus, Timer} = require.main.require('./controllers')

module.exports = (app) => {
  app.get('/timers',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.status(200).send(await Timer.getAll())
    }
  )
  
  app.post('/timers',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.status(201).send(await Timer.createTimer(req.body))
    }
  )
  
  app.put('/timers/:id',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.status(200).send(await Timer.updateById(req.params.id, req.body))
    }
  )
  
  app.delete('/timers/:id',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.status(200).send(await Timer.deleteById(req.params.id))
    }
  )
}

