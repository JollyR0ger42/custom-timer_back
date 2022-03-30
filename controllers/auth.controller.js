const {User} = require.main.require('./models')
const bcrypt = require('bcryptjs')

const createUser = async ({name, password}) => {
  console.log('create user:', {name, password})
  let user = await User.findOne({where: {name}})
  if (user) return false
  user = await User.create({name, password: bcrypt.hashSync(password, 8)})
  return user
}

const verifyUser = async ({name, password}) => {
  let user = await User.findOne({where: {name}})
  if (!user) return false
  const passwordIsValid = bcrypt.compareSync(password, user.password)
  if (passwordIsValid) return user
  else return false
}

module.exports = {
  createUser,
  verifyUser
}
