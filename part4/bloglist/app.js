const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const app = express()

logger.info(`App running in mode ${process.env.NODE_ENV}`)
logger.info(`Connecting to URL: ${config.MONGO_URL}`)

mongoose.connect(config.MONGO_URL)
    .then(() => logger.info('Connected to MongoDB!'))
    .catch(err => logger.error('Error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app