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
  // [KAV]TODO: shpuld be more smart for 2 device at same acc,
  // e.g. if u send stop from 2 different devices - it shouldnt update on second STOP
  const timer = await Timer.findByPk(id)
  if (payload?.started && timer.stopped) {
    await timer.update({started: payload.started, stopped: null})
  } else if (payload?.stopped && !timer.stopped) {
    const timePassed = new Date(payload.stopped) - new Date(timer.started)
    const timeLeft = timer.timeLeft - timePassed
    console.log(timeLeft)
    await timer.update({stopped: payload.stopped, timeLeft})
  }
  return timer
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
