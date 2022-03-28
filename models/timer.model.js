module.exports = (Sequelize, sequelize) => {
  class Timer extends Sequelize.Model {}
  Timer.init({
    name: {type: Sequelize.STRING},
    timeLeft: {type: Sequelize.INTEGER},
    started: {type: Sequelize.STRING},
    stopped: {type: Sequelize.STRING}
  }, {
    sequelize,
    modelName: 'timers'
  })
  return Timer
}