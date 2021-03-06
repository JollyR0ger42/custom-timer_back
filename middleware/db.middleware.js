const checkDbStatus = (dbStatus) => {
  return (req, res, next) => {
    if (dbStatus.isConnected) next()
    else res.status(503).send({error: 'No DB connection.'})
  }
}

module.exports = {
  checkDbStatus
}
