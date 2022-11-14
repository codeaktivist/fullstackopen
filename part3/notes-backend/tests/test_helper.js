const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
    {
        content: 'JS is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'HTML is easy',
        date: new Date(),
        important: true,
    }
]

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon', date: new Date() })
    await note.save()
    await note.remove()
    return note._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialNotes,
    notesInDb,
    nonExistingId,
    usersInDb
}