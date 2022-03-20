// set env var
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(require('./routes.js'))

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`)
})
