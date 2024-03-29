import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const Notification = ({message}) => {
        if (message === null)
            return null
        else
        {
            return (
                <div className='error'>{message}</div>
            )
        }
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setErrorMessage(`The message ID ${id} does not exist`)
            setTimeout(() => setErrorMessage(null), 5000)
            setNotes(notes.filter(n => n.id !== id))})
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note => 
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
      <Footer />
    </div>
  )
}

export default App