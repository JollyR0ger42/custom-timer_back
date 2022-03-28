const db = require.main.require('./models')

const getAll = async () => {
  return await db.Timer.findAll()
}

const create = async (payload) => {
  await db.Timer.create(payload)
  return await db.Timer.findAll()
}

const updateById = async (id, payload) => {
  const timer = await db.Timer.findByPk(id)
  await timer.update(payload)
  return timer
}

const deleteById = async (id) => {
  const timer = await db.Timer.findByPk(id)
  await timer.destroy()
  return await db.Timer.findAll()
}

module.exports = {
  getAll,
  create,
  updateById,
  deleteById
}
