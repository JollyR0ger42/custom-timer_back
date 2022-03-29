const {checkDbStatus} = require.main.require('./middleware')
const {dbStatus, Timer} = require.main.require('./controllers')

module.exports = (app) => {
  app.get('/timers',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.getAll())
    }
  )
  
  app.post('/timers',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.createTimer(req.body))
    }
  )
  
  app.put('/timers/:id',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.updateById(req.params.id, req,body))
    }
  )
  
  app.delete('/timers/:id',
    checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.deleteById(req.params.id))
    }
  )
}

