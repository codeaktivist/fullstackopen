const logger = require('../utils/logger')
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({}).then((notes) => {
            response.json(notes)
        })
})

notesRouter.get('/:id', (request, response, next) => {
    logger.info(`Searching for id ${request.params.id}`)
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                logger.info('Note detais: ', note);
                response.status(202).json(note)
            } else {
                logger.info('Note not found')
                response.status(404).json({ error: 'note not found'})
            }
        })
        .catch((err) => next(err))
})

notesRouter.delete('/:id', (request, response, next) => {
    logger.info(`deleting note id ${request.params.id}`)
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
            logger.info('Deleted Note: ', result)
        })
        .catch(err => next(err))
})

notesRouter.put('/:id', (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id, {
        content: request.body.content,
        important: request.body.important
    }, { new: true , runValidators: true , context: 'query'})
        .then(result => {
            logger.info('Updated note to: ', result)
            response.json(result)
        })
        .catch(err => next(err))
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({ error : "Please provide description" })
    }
    
    const note = new Note ({
        content: body.content,
        date: new Date(),
        important: request.body.important || false
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(err => next(err))
})

module.exports = notesRouter