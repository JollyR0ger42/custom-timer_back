const requiredFields = (requiredFields) => {
  return async (req, res, next) => {
    const requestFields = Object.keys(req.body)
    const missingFields = requiredFields.filter(value => !requestFields.includes(value))
    if (missingFields.length) res.send({missingFields})
    else next()
  }
}

module.exports = {
  requiredFields
}
