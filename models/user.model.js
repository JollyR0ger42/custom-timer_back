module.exports = (Sequelize, sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    name: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
  }, {
    sequelize,
    modelName: 'users'
  })
  return User
}
