const timer = require('./timer.routes.js')
const auth = require('./auth.routes.js')

module.exports = (app) => {
  timer(app)
  auth(app)
}