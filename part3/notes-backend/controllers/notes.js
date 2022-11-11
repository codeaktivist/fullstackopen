const logger = require('../utils/logger')
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
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

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const note = new Note ({
        content: body.content,
        date: new Date(),
        important: request.body.important || false
    })

    const savedNote = await note.save()
    response.status(201).json(savedNote)
})

module.exports = notesRouter