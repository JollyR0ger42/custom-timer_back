const {User} = require.main.require('./models')

const createUser = async ({name, password}) => {
  console.log('create user:', {name, password})
}

module.exports = {
  createUser
}
