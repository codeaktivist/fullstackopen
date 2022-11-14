const logger = require('../utils/logger')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user', { notes: 0 })
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
    logger.info(`Searching for id ${request.params.id}`)
    const searchedNote = await Note.findById(request.params.id)
    if (searchedNote) {
        response.status(202).json(searchedNote)
    } else {
        response.status(404).json({ error: 'note not found' })
    }
})

notesRouter.delete('/:id', async (request, response) => {
    logger.info(`deleting note id ${request.params.id}`)
    const noteToDelete = await Note.findById(request.params.id)
    if (noteToDelete) {
        await Note.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(404).json({ error: 'Note for deletion not found' } )
    }
})

notesRouter.put('/:id', (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id, {
        content: request.body.content,
        important: request.body.important
    }, { new: true , runValidators: true , context: 'query' })
        .then(result => {
            logger.info('Updated note to: ', result)
            response.json(result)
        })
        .catch(err => next(err))
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

notesRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const note = new Note ({
        content: body.content,
        date: new Date(),
        important: request.body.important || false,
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
})

module.exports = notesRouter