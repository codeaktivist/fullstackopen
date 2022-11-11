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

test('a specific note can be viewed', async () => {
    const noteToCheck = (await helper.notesInDb())[0]
    const noteInResponse = await api
        .get(`/api/notes/${noteToCheck.id}`)
        .expect(202)
        .expect('Content-Type', /application\/json/)

    expect(noteInResponse.body).toEqual(JSON.parse(JSON.stringify(noteToCheck)))
})

test('a note can be deleted', async () => {
    const noteToDelete = (await helper.notesInDb())[0]
    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    expect(notesAtEnd).not.toContain(noteToDelete)
})

afterAll(() => {
    mongoose.connection.close()
})
