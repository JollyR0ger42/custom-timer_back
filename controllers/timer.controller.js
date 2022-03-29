const {Timer} = require.main.require('./models')

const getAll = async () => {
  return await Timer.findAll()
}

const createTimer = async (payload) => {
  await Timer.createTimer(payload)
  return await Timer.findAll()
}

const updateById = async (id, payload) => {
  // [KAV]TODO: shpuld be more smart for 2 device at same acc,
  // e.g. if u send stop from 2 different devices - it shouldnt update on second STOP
  const timer = await Timer.findByPk(id)
  await timer.update(payload)
  return timer
}

const deleteById = async (id) => {
  const timer = await Timer.findByPk(id)
  await timer.destroy()
  return await Timer.findAll()
}

module.exports = {
  getAll,
  createTimer,
  updateById,
  deleteById
}
