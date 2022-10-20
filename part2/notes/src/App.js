import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    console.log('effect')
    noteService
        .getAll()
        .then(initialNotes => {
            console.log('getAll: ', initialNotes)
            setNotes(initialNotes)
        })
  }, [])

  console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    noteService
        .create(noteObject)
        .then(newNote => {
            console.log('create: ', newNote)
            setNotes(notes.concat(newNote))
            setNewNote('')
        })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const noteObject = {
        ...note,
        important: !note.important
    }
    noteService
        .update(id, noteObject)
        .then(changesNote => {
            setNotes(notes.map(n => n.id !== id ? n : changesNote))
        })
        .catch(err => {
            alert(`The message ID ${id} does not exist`)
            setNotes(notes.filter(n => n.id !== id))})
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
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

export default App