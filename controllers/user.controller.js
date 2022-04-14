const {User} = require.main.require('./models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async ({id, password}) => {
  console.log('create user:', {id, password})
  let user = await User.findOne({where: {id}})
  if (user) return false
  user = await User.create({id, password: bcrypt.hashSync(password, 8)})
  return user
}

const verifyUser = async ({id, password}) => {
  let user = await User.findOne({where: {id}})
  if (!user) return false
  const passwordIsValid = bcrypt.compareSync(password, user.password)
  if (passwordIsValid) return user
  else return false
}

const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    {expiresIn: '30d'}
  )
}

module.exports = {
  createUser,
  verifyUser,
  generateToken
}
