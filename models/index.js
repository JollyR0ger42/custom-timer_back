const {sequelize, Sequelize} = require('./sequelize')
const utils = require.main.require('./utils.js')

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.Timer = require('./timer.model.js')(Sequelize, sequelize)

db.init = async () => {
  const MAX_ATTEMPTS = 100
  const DELAY = 10000 // ms
  let attempt = 0
  while (attempt < MAX_ATTEMPTS) {
    if (attempt) {
      console.log(`Reconnect will hapened after ${DELAY/1000}s delay.`)
      await utils.delay(DELAY)
    }
    console.log(`Attempt #${attempt+1}: Syncing models...`)
    try {
      await db.sequelize.sync({alter: true})
      console.log('Models synced.')
      return true
    } catch (error) {
      console.error('Unable to connect to the database:\n', error)
    }
    attempt++
  }
  return false
}

module.exports = db