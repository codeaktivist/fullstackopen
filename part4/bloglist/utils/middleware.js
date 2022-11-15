const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authHeader = request.get('Authorization')

    if (authHeader){
        authHeader.toLocaleLowerCase().startsWith('bearer')
            ? request.token = authHeader.substring(7)
            : null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    if (token) {
        const user = jwt.decode(token, process.env.SECRET)
        if (user) {
            request.user = await User.findById(user.id)
        } else {
            request.user = null
        }
    } else {
        request.user = null
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'validation error' })
    }

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    }

    next(error)
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}