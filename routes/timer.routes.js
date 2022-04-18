const {checkDbStatus, verifyToken} = require.main.require('./middleware')
const {dbStatus, Timer} = require.main.require('./controllers')

module.exports = (app) => {
  app.get('/timers',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      const result = await Timer.getAllById(req.userId)
      if (result) res.status(200).send(result)
      else res.status(500).send({error: 'Cannot get timers.'})
    }
  )
  
  app.post('/timers',
    verifyToken,
    checkDbStatus(dbStatus),
    async (req, res) => {
      const newTimer = {
        ...req.body,
        userId: req.userId
      }
      const result = await Timer.createTimer(newTimer)
      if (result) res.status(201).send(result)
      else res.status(400).send({error: 'No timer created.'})
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

