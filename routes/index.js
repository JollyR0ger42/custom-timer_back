const timer = require('./timer.routes.js')
const auth = require('./auth.routes.js')

// [KAV]TODO: http codes, and other GOST stuff
module.exports = (app) => {
  timer(app)
  auth(app)
}