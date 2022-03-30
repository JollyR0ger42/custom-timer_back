const db = require.main.require('./models')
const Timer = require('./timer.controller.js')
const User = require('./auth.controller.js')

let dbStatus = {isConnected: false}

db.init({skip: false})
  .then(result => {
    if (result) {
      dbStatus.isConnected = true
      console.log('DB connected.')
    }
    else console.log('Dont have DB connection.')
  })

module.exports = {
  dbStatus,
  Timer,
  User
}
