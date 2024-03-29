const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'Endpoint not found' })
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'validation error' })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'Token Error' })
    }

    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired'})
    }

    logger.error(error.message)

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}