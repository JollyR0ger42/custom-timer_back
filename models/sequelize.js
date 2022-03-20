const sequelizeCfg = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
}

// Init db
const Sequelize = require('sequelize')
const sequelize = new Sequelize(sequelizeCfg.database, sequelizeCfg.user, sequelizeCfg.password, {
  dialect: 'postgres',
  logging: false,
  host: sequelizeCfg.host,
  port: sequelizeCfg.port
})
// Exports
module.exports = {
  sequelize,
  Sequelize
}
