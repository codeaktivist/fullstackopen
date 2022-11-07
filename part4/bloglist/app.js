const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

const app = express()

logger.info(`Connecting to URL: ${config.MONGO_URL}`)
mongoose.connect(config.MONGO_URL)
    .then(() => logger.info('Connected to MongoDB!'))
    .catch(err => logger.error('Error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app