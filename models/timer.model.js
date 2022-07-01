module.exports = (Sequelize, sequelize) => {
  class Timer extends Sequelize.Model {}
  Timer.init({
    name: {type: Sequelize.STRING},
    timeLeft: {type: Sequelize.STRING},
    started: {type: Sequelize.STRING},
    stopped: {type: Sequelize.STRING},
    initTimeLeft: {type: Sequelize.STRING},
  }, {
    sequelize,
    modelName: 'timers'
  })
  return Timer
}
