const middleware = require.main.require('./middleware')
const {dbStatus, Timer} = require.main.require('./controllers')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello browser')
  })
  
  app.get('/timers',
    middleware.checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.getAll())
    }
  )
  
  app.post('/timers',
    middleware.checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.create(req.body))
    }
  )
  
  app.put('/timers/:id',
    middleware.checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.updateById(req.params.id, req,body))
    }
  )
  
  app.delete('/timers/:id',
    middleware.checkDbStatus(dbStatus),
    async (req, res) => {
      res.send(await Timer.deleteById(req.params.id))
    }
  )
}

