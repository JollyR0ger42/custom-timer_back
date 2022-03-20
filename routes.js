const router = require('express').Router()
const db = require('./models')
const middleware = require('./middleware')

let dbStatus = {isConnected: false}

db.init()
  .then(result => {
    if (result) {
      dbStatus.isConnected = true
      console.log('DB connected.')
    }
    else console.log('Dont have DB connection.')
  })

router.get('/', (req, res) => {
  res.send('Hello browser')
})

router.get('/timers',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    const timers = await db.Timer.findAll()
    res.send(timers)
  }
)

router.post('/timers',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    await db.Timer.create(req.body)
    res.send(await db.Timer.findAll())
  }
)

router.put('/timers/:id',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    const target = await db.Timer.findByPk(req.params.id)
    await target.update(req.body)
    res.send(target)
  }
)

router.delete('/timers/:id',
  middleware.checkDbStatus(dbStatus),
  async (req, res) => {
    const target = await db.Timer.findByPk(req.params.id)
    await target.destroy()
    res.send(await db.Timer.findAll())
  }
)

module.exports = router
