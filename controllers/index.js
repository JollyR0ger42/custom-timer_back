const db = require.main.require('./models')
const Timer = require('./timer.controller.js')

let dbStatus = {isConnected: false}

db.init({skip: true})
  .then(result => {
    if (result) {
      dbStatus.isConnected = true
      console.log('DB connected.')
    }
    else console.log('Dont have DB connection.')
  })

module.exports = {
  dbStatus,
  Timer
}
