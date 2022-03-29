module.exports = (dbStatus) => {
  return (req, res, next) => {
    if (dbStatus.isConnected) next()
    else res.send({error: 'No DB connection.'})
  }
}