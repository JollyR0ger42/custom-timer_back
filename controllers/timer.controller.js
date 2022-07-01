const {Timer} = require.main.require('./models')

const getAllById = async (id) => {
  return await Timer.findAll({
    where: {userId: id},
    order: ['name', 'id']
  })
}

const createTimer = async (payload) => {
  let result
  const newTimer = {
    ...payload,
    started: new Date().toUTCString(),
    stopped: new Date().toUTCString(),
    timeLeft: payload.initTimeLeft,
  }
  try {
    await Timer.create(newTimer)
    result = await Timer.findAll({order: ['name', 'id']})
  }
  catch (error) {console.error(error)}
  return result
}

const updateById = async (id, payload) => {
  let result
  console.log(payload)
  const timer = await Timer.findByPk(id)
  const fields = {...payload}
  if (payload?.stopped) {
    const timePassed = new Date(payload.stopped) - new Date(timer.started)
    fields.timeLeft = timer.timeLeft - timePassed
  }
  if (payload.initTimeLeft && timer.initTimeLeft != payload.initTimeLeft) {
    fields.started = new Date().toUTCString()
    fields.stopped = new Date().toUTCString()
    fields.timeLeft = payload.initTimeLeft
  }
  await timer.update(fields)

  try {result = await Timer.findAll({order: ['name', 'id']})}
  catch (error) {console.error(error)}
  return result
}

const deleteById = async (id) => {
  const timer = await Timer.findByPk(id)
  await timer.destroy()
  return await Timer.findAll({order: ['name', 'id']})
}

module.exports = {
  getAllById,
  createTimer,
  updateById,
  deleteById
}
