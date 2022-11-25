import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Toggleable from './components/Togglable'
import LoginForm from './components/Login'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedNoteappUser')
    if (user) {
        const userJSON = JSON.parse(user)
        setUser(userJSON)
        noteService.setToken(userJSON.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <Toggleable buttonLabel='login'>
        <LoginForm
            setUser={setUser}
            setErrorMessage={setErrorMessage} />
      </Toggleable>
    )
  }

  const noteFormRef = useRef()

  const noteForm = () => {
    return(
        <Toggleable buttonLabel='new note' ref={noteFormRef}>
            <NoteForm createNote={createNote}/>
        </Toggleable>
    )
  }

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
        .create(noteObject)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
        ? loginForm()
        : <div>
            <p>{user.name} logged-in</p>
            {noteForm()}
          </div>
      }

      <div>
        <h2>Notes in Database</h2>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            notes={notes}
            setNotes={setNotes}
            setErrorMessage={setErrorMessage}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App