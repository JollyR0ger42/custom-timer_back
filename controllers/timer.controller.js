const {Timer} = require.main.require('./models')

const getAllById = async (id) => {
  return await Timer.findAll({
    where: {userId: id},
    order: ['name']
  })
}

const createTimer = async (payload) => {
  let result
  const newTimer = {
    ...payload,
    started: new Date().toUTCString(),
    stopped: new Date().toUTCString()
  }
  try {
    await Timer.create(newTimer)
    result = await Timer.findAll({order: ['name']})
  }
  catch (error) {console.error(error)}
  return result
}

const updateById = async (id, payload) => {
  let result
  console.log(payload)
  const timer = await Timer.findByPk(id)
  // for start timer
  if (payload?.started && timer.stopped) {
    await timer.update({started: payload.started, stopped: null})
  // for stop timer
  } else if (payload?.stopped && !timer.stopped) {
    const timePassed = new Date(payload.stopped) - new Date(timer.started)
    const timeLeft = timer.timeLeft - timePassed
    await timer.update({stopped: payload.stopped, timeLeft})
  // for upd fields
  } else {
    await timer.update(payload)
  }
  try {result = await Timer.findAll({order: ['name']})}
  catch (error) {console.error(error)}
  return result
}

const deleteById = async (id) => {
  const timer = await Timer.findByPk(id)
  await timer.destroy()
  return await Timer.findAll({order: ['name']})
}

module.exports = {
  getAllById,
  createTimer,
  updateById,
  deleteById
}
