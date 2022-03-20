module.exports = (dbStatus) => {
  return (req, res, next) => {
    if (dbStatus.isConnected) next()
    else res.send('No DB connection.')
  }
}