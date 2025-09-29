const express = require('express')
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT || 3000
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log("Example app listening on port: " + PORT)
})
