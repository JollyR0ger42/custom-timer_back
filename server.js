// set env var
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const {verifyToken} = require('./middleware')

app.use(cors())
app.use(express.json())
require('./routes')(app)

const PORT = process.env.SERVER_PORT || 3000

app.get(
  '/',
  verifyToken,
  (req, res) => {
  res.status(200).send({message: 'Hello ' + req.userName})
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`)
})
