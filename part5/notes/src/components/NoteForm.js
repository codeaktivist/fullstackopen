import { useState } from 'react'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: false,
        }

        createNote(noteObject)
        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>

        </div>

    )
}

export default NoteForm