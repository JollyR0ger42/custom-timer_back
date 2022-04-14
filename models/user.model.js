module.exports = (Sequelize, sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {type: Sequelize.STRING}
  }, {
    sequelize,
    modelName: 'users'
  })
  return User
}
