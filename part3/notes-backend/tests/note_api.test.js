const mongoose = require('mongoose')
const Note = require('../models/note')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})

    for (let note of helper.initialNotes) {
        await new Note(note).save()
    }
})
describe('when there are initial notes in the database', () => {
    test('notes received from server as JSON', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    test('a specific note is within returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map(r => r.content)
        expect(contents).toContain('HTML is easy')
    })
})

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const validNote = (await helper.notesInDb())[0]
        const result = await api
            .get(`/api/notes/${validNote.id}`)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual(JSON.parse(JSON.stringify(validNote)))
    })

    test('lookup fails with statuscode 404 if note does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()
        await api
            .get(`/api/notes/${nonExistingId}`)
            .expect(404)
    })

    test('lookup fails with statuscode 400 if invalid id provided', async () => {
        const invalidId = '1234'
        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'a new note added by test',
            important: true
        }
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contexts = notesAtEnd.map(r => r.content)
        expect(contexts).toContain('a new note added by test')
    })

    test('note without content is not added', async () => {
        const newNote = {
            important: false
        }
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deleting a note', () => {
    test('a note can be deleted', async () => {
        const noteToDelete = (await helper.notesInDb())[0]
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
        expect(notesAtEnd).not.toContain(noteToDelete)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
