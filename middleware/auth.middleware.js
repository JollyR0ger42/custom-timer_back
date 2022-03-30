const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) return res.send({message: 'No token'})
  else if (token === 'token') return next()
  else return res.send({message: 'Unauthorized'})
}

module.exports = {
  verifyToken
}
