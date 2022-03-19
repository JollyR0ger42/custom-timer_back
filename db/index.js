
const {sequelize, Timer} = require('./models.js')
const utils = require.main.require('./utils.js')

module.exports = {
  init: async () => {
    let synced = false
    while (!synced) {
      try {
        console.log('Syncing models...')
        await sequelize.sync({alter: true})
        synced = true
        console.log('Models synced.')
      } catch (error) {
        console.error('Unable to connect to the database:\n', error)
        console.log('Reconnect after 5s delay.')
        await utils.delay(5000)
      }
    }
    return {Timer}
  }
}
