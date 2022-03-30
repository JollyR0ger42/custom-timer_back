const {User} = require.main.require('./models')
const bcrypt = require('bcryptjs')

const createUser = async ({name, password}) => {
  console.log('create user:', {name, password})
  let user = await User.findOne({where: {name}})
  if (user) return false
  user = await User.create({name, password: bcrypt.hashSync(password, 8)})
  return user
}

module.exports = {
  createUser
}
