const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']
  let result
  try {
    result = await jwt.verify(token, process.env.SECRET_KEY)
    req.userName = result.name
    console.log(result)
    return next()
  }
  catch(error) {
    console.log(error)
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).send({error: 'Token expired'})
    } else {
      return res.status(401).send({error: 'Unauthorized'})
    }
  }
}

module.exports = {
  verifyToken
}
