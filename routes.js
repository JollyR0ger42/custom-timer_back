const router = require('express').Router()
const middleware = require('./middleware')
const {dbStatus, Timer} = require('./controllers')

router.get('/', (req, res) => {
  res.send('Hello browser')
})

router.get('/timers',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    res.send(await Timer.getAll())
  }
)

router.post('/timers',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    res.send(await Timer.create(req.body))
  }
)

router.put('/timers/:id',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    res.send(await Timer.updateById(req.params.id, req,body))
  }
)

router.delete('/timers/:id',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    res.send(await Timer.deleteById(req.params.id))
  }
)

module.exports = router
