import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    console.log('Changing note: ', note);
    const noteObject = {
        ...note,
        important: !note.important
    }
    noteService
        .update(id, noteObject)
        .then(changesNote => {
            console.log('Changed note ', changesNote)
            if (changesNote) {
                setNotes(notes.map(n => n.id !== id ? n : changesNote))
            } else {
                setErrorMessage(`The note ID ${id} does not exist`)
                setTimeout(() => setErrorMessage(null), 5000)
                setNotes(notes.filter(n => n.id !== id))
            }
        })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)

  const LoginForm = () => {
    const handleLogin = (event) => {
        event.preventDefault()
        console.log(`logging in with ${username} and ${password}`)
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                        <input
                            type='text'
                            name='username'
                            value={username}
                            onChange= {({target}) => {setUsername(target.value)}}
                            />
                </div>
                    Password
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={({target}) => {setPassword(target.value)}}
                            />
                <button type='submit'>login</button>
            </form>
        </div>
        )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <LoginForm />
      </div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {
            notesToShow.map(note => 
                <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}/>)
        }
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